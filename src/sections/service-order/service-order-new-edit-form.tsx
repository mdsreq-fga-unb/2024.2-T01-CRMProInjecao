import * as Yup from 'yup';
import { useMemo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFSelect, RHFMultiSelect } from 'src/components/hook-form';
import { createServiceOrder, updateServiceOrder, useGetServiceOrderTypes } from 'src/api/service-order';
import { IServiceOrder , ServiceOrderStatus } from 'src/types/service-order';
import useSWR, { mutate } from 'swr';
import { endpoints, fetcher } from '@/utils/axios';
import { useGetClients } from '@/api/client';
import { CircularProgress, IconButton, Typography, Divider, MenuItem } from '@mui/material';
import { useGetProductsByFilter } from '@/api/product';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import { IVehicle } from '@/types/vehicle';
import { fCurrency } from '@/utils/format-number';
import Label from '@/components/label';
import ServiceHistoryTimeline from '@/components/service-history/service-history-timeline';
import { useGetServiceHistoryByServiceOrder } from '@/api/service-history';
import ServiceOrderTypeModal from './service-order-type-modal';

type Props = {
  currentServiceOrder?: IServiceOrder | null;
  onClose: VoidFunction;
};

// Adicionar hook personalizado para veículos filtrados
const useFilteredVehicles = (clientCPF: string) => {
  const { data: vehicles, isLoading } = useSWR(
    clientCPF ? `${endpoints.vehicle.findAll}?clientCPF=${clientCPF}` : null,
    fetcher
  );

  return {
    vehicles: vehicles || [],
    vehiclesLoading: isLoading,
  };
};

export default function ServiceOrderNewEditForm({ currentServiceOrder, onClose }: Props) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const typeModal = useBoolean();
  const [totalCost, setTotalCost] = useState(0);

  const { clients, clientsLoading } = useGetClients();
  const { serviceOrderTypes, serviceOrderTypesLoading } = useGetServiceOrderTypes();
  const { products, productsLoading } = useGetProductsByFilter(null, null)

  const NewServiceOrderSchema = Yup.object().shape({
    typeId: Yup.string().required('Tipo de serviço é obrigatório'),
    description: Yup.string().required('Descrição é obrigatória'),
    clientCPF: Yup.string()
      .min(11, 'CPF inválido')
      .required('Cliente é obrigatório'),
    vehicleLicensePlate: Yup.string()
      .min(7, 'Placa inválida')
      .required('Veículo é obrigatório'),
    additionalCost: Yup.number().min(0, 'Valor deve ser positivo'),
    productIds: Yup.array().of(Yup.string()),
    status: Yup.string().oneOf(Object.values(ServiceOrderStatus)),
  });

  const defaultValues = useMemo(
    () => ({
      typeId: currentServiceOrder?.type.id || '',
      description: currentServiceOrder?.description || '',
      clientCPF: currentServiceOrder?.client.cpf || '',
      vehicleLicensePlate: currentServiceOrder?.vehicle.licensePlate || '',
      additionalCost: currentServiceOrder?.additionalCost || 0,
      productIds: currentServiceOrder?.products.map((product) => product.id) || [],
      status: currentServiceOrder?.status || ServiceOrderStatus.IN_PROGRESS,
    }),
    [currentServiceOrder]
  );

  const methods = useForm({
    resolver: yupResolver(NewServiceOrderSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const selectedClientCPF = watch('clientCPF');

  const values = watch()

  // Substituir o useGetVehicles pelo hook filtrado
  const { vehicles, vehiclesLoading } = useFilteredVehicles(selectedClientCPF);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const cleanData = {
        ...data,
        productIds: data.productIds?.filter((id): id is string => id !== undefined)
      };

      if (currentServiceOrder) {
        await updateServiceOrder(currentServiceOrder.id, cleanData);
        enqueueSnackbar('Ordem de serviço atualizada com sucesso!', { variant: 'success' });
      } else {
        await createServiceOrder(cleanData);
        enqueueSnackbar('Ordem de serviço criada com sucesso!', { variant: 'success' });
      }
      reset();
      onClose();
      router.push('/dashboard/service-orders');
      mutate(endpoints.serviceOrder.findAll);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao salvar ordem de serviço', { variant: 'error' });
    }
  });

  // Calcula o custo total em tempo real
  useEffect(() => {
    const calculateTotal = async () => {
      let total = 0;

      // Soma o preço do tipo de serviço
      const selectedType = serviceOrderTypes?.find((type) => type.id === watch('typeId'));
      if (selectedType) {
        total += parseFloat(String(selectedType.price)) || 0;
      }

      // Soma o custo adicional
      total += parseFloat(String(watch('additionalCost'))) || 0;

      // Soma o preço dos produtos selecionados
      const selectedProducts = products?.filter((product) =>
        (watch('productIds') as string[])?.includes(product.id)
      ) || [];

      total += selectedProducts.reduce((sum, product) => {
        const productPrice = parseFloat(String(product.sellPrice)) || 0;
        return sum + productPrice;
      }, 0);

      setTotalCost(Number(total.toFixed(2)));
    };

    calculateTotal();
  }, [watch, serviceOrderTypes, products]);

  if (clientsLoading || serviceOrderTypesLoading || productsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          {/* Informações do Orçamento (se existir) */}
          {currentServiceOrder?.budget && (
            <Card sx={{ p: 3, mb: 3 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
                <Typography variant="h6">Orçamento Vinculado</Typography>
                <Label
                  variant="soft"
                  color={
                    (currentServiceOrder.budget.status === 'accepted' && 'success') ||
                    (currentServiceOrder.budget.status === 'canceled' && 'error') ||
                    'warning'
                  }
                >
                  {currentServiceOrder.budget.status === 'accepted' && 'Aceito'}
                  {currentServiceOrder.budget.status === 'canceled' && 'Cancelado'}
                  {currentServiceOrder.budget.status === 'pending' && 'Pendente'}
                </Label>
              </Stack>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    Nome do Orçamento
                  </Typography>
                  <Typography variant="body2">{currentServiceOrder.budget.name}</Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    ID do Orçamento
                  </Typography>
                  <Typography variant="body2">{currentServiceOrder.budget.id}</Typography>
                </Box>
              </Stack>
            </Card>
          )}
          {currentServiceOrder && (
            <Grid xs={12} md={12} sx={{ p: 1, justifyContent: 'space-between' }}>
              <Stack direction='row' spacing={2} alignItems="center" sx={{
                mb: 1
              }}>
                <Typography variant="h6">
                  Status
                </Typography>
                <Label
                  variant="soft"
                  color={
                    (currentServiceOrder.status === ServiceOrderStatus.COMPLETED && 'success') ||
                    (currentServiceOrder.status === ServiceOrderStatus.CANCELED && 'error') ||
                    'warning'
                  }
                >
                  {currentServiceOrder.status === ServiceOrderStatus.COMPLETED && 'Concluída'}
                  {currentServiceOrder.status === ServiceOrderStatus.CANCELED && 'Cancelada'}
                  {currentServiceOrder.status === ServiceOrderStatus.IN_PROGRESS && 'Em Andamento'}
                </Label>
                <Stack direction="row" spacing={2} alignItems="center">
                  <LoadingButton
                    variant="contained"
                    color="success"
                    startIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
                    onClick={async () => {
                      try {
                        await updateServiceOrder(currentServiceOrder.id, {
                          status: ServiceOrderStatus.COMPLETED
                        });
                        enqueueSnackbar('Ordem de serviço concluída com sucesso!', { variant: 'success' });
                        mutate(endpoints.serviceOrder.findAll);
                        onClose();
                      } catch (error) {
                        console.error(error);
                        enqueueSnackbar('Erro ao concluir ordem de serviço', { variant: 'error' });
                      }
                    }}
                    disabled={currentServiceOrder.status !== ServiceOrderStatus.IN_PROGRESS}
                  >
                    Concluir
                  </LoadingButton>

                  <LoadingButton
                    variant="contained"
                    color="error"
                    startIcon={<Iconify icon="eva:close-circle-fill" />}
                    onClick={async () => {
                      try {
                        await updateServiceOrder(currentServiceOrder.id, {
                          status: ServiceOrderStatus.CANCELED
                        });
                        enqueueSnackbar('Ordem de serviço cancelada com sucesso!', { variant: 'success' });
                        mutate(endpoints.serviceOrder.findAll);
                        onClose();
                      } catch (error) {
                        console.error(error);
                        enqueueSnackbar('Erro ao cancelar ordem de serviço', { variant: 'error' });
                      }
                    }}
                    disabled={currentServiceOrder.status !== ServiceOrderStatus.IN_PROGRESS}
                  >
                    Cancelar
                  </LoadingButton>
                </Stack>
              </Stack>

            </Grid>
          )}

          <Grid xs={12} md={6} sx={{ p: 1 }}>
            <Box sx={{ position: 'relative' }}>
              <RHFSelect native name="typeId" label="Tipo de Serviço" placeholder='Selecione o tipo de serviço'>
                <option value="" />
                {serviceOrderTypes?.map((type) => (
                  <option key={type.id} value={type.id}>
                    {`${type.name} - R$ ${type.price}`}
                  </option>
                ))}
              </RHFSelect>
              <IconButton
                onClick={typeModal.onTrue}
                sx={{
                  position: 'absolute',
                  zIndex: 1000,
                  right: -40,
                  top: '50%',
                  mr: 1.5,
                  transform: 'translateY(-50%)',
                }}
              >
                <Iconify icon="material-symbols:settings" />
              </IconButton>
            </Box>
          </Grid>

          <Grid xs={12} md={6} sx={{ p: 1 }}>
            <RHFSelect native name="clientCPF" label="Cliente">
              <option value="" />
              {clients?.map((client) => (
                <option key={client.cpf} value={client.cpf}>
                  {client.name} - CPF: {client.cpf}
                </option>
              ))}
            </RHFSelect>
          </Grid>

          <Grid xs={12} md={6} sx={{ p: 1 }}>
            <RHFSelect
              native
              name="vehicleLicensePlate"
              label="Veículo"
              placeholder='Selecione o veículo'
              disabled={!selectedClientCPF}
            >
              <option value="" />
              {vehicles?.map((vehicle: IVehicle) => (
                <option key={vehicle.licensePlate} value={vehicle.licensePlate}>
                  {vehicle.model} - Placa: {vehicle.licensePlate}
                </option>
              ))}
            </RHFSelect>
          </Grid>

          <Grid xs={12} md={6} sx={{ p: 1 }}>
            <RHFTextField
              name="additionalCost"
              label="Custo Adicional"
              placeholder='R$ 0,00'
              type="number"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid xs={12} md={12} sx={{ p: 1 }}>
            <RHFTextField
              name="description"
              label="Descrição"
              multiline
              rows={3}
              sx={{ gridColumn: 'span 2' }}
            />
          </Grid>

          <Grid xs={12} md={12} sx={{ p: 1 }}>
            <RHFMultiSelect
              sx={{
                width: '100%'
              }}
              fullWidth
              multiple
              name="productIds"
              label="Produtos"
              placeholder='Selecione os produtos'
              options={products?.map((product) => ({
                label: `${product.name} - R$ ${product.sellPrice}`,
                value: product.id,
              }))}
              checkbox
            />
          </Grid>

          {/* Custos */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Custos
            </Typography>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField
                name="additionalCost"
                label="Custo Adicional"
                type="number"
                InputLabelProps={{ shrink: true }}
              />

              {/* Espaço vazio para manter o grid alinhado */}
              <Box />

              <Box sx={{ gridColumn: 'span 2' }}>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={1}>
                  {/* Detalhamento dos custos */}
                  {serviceOrderTypes?.find((type) => type.id === watch('typeId')) && (
                    <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'right' }}>
                      Serviço: {fCurrency(serviceOrderTypes.find((type) => type.id === watch('typeId'))?.price || 0)}
                    </Typography>
                  )}

                  {values.additionalCost && values.additionalCost > 0 && (
                    <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'right' }}>
                      Custo Adicional: {fCurrency(values.additionalCost)}
                    </Typography>
                  )}

                  {products?.filter(p => values.productIds?.includes(p.id)).length > 0 && (
                    <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'right' }}>
                      Produtos: {fCurrency(
                        products
                          .filter(p => values.productIds?.includes(p.id))
                          .reduce((sum, p) => sum + (parseFloat(String(p.sellPrice)) || 0), 0)
                      )}
                    </Typography>
                  )}

                  <Typography variant="subtitle1" sx={{ textAlign: 'right' }}>
                    Valor Total: {fCurrency(totalCost)}
                  </Typography>
                </Stack>
              </Box>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentServiceOrder ? 'Criar Ordem de Serviço' : 'Salvar Mudanças'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>

      </Grid>
      <ServiceOrderTypeModal open={typeModal.value} onClose={typeModal.onFalse} />
    </FormProvider>
  );
} 