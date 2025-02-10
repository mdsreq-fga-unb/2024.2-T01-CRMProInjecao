import * as Yup from 'yup';
import { useMemo, useEffect } from 'react';
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
import { createServiceOrder, updateServiceOrder , useGetServiceOrderTypes } from 'src/api/service-order';
import { IServiceOrder } from 'src/types/service-order';
import useSWR, { mutate } from 'swr';
import { endpoints , fetcher } from '@/utils/axios';
import { useGetClients } from '@/api/client';
import { CircularProgress , IconButton } from '@mui/material';
import { useGetProducts } from '@/api/product';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import { IVehicle } from '@/types/vehicle';
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

  const { clients, clientsLoading } = useGetClients();
  const { serviceOrderTypes, serviceOrderTypesLoading } = useGetServiceOrderTypes();
  const { products, productsLoading } = useGetProducts();

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
  });

  const defaultValues = useMemo(
    () => ({
      typeId: currentServiceOrder?.type.id || '',
      description: currentServiceOrder?.description || '',
      clientCPF: currentServiceOrder?.client.cpf || '',
      vehicleLicensePlate: currentServiceOrder?.vehicle.licensePlate || '',
      additionalCost: currentServiceOrder?.additionalCost || 0,
      productIds: currentServiceOrder?.products.map((product) => product.id) || [],
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
          <Grid xs={12} md={6}>
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

          <Grid xs={12} md={6}>
            <RHFSelect native name="clientCPF" label="Cliente">
              <option value="" />
              {clients?.map((client) => (
                <option key={client.cpf} value={client.cpf}>
                  {client.name} - CPF: {client.cpf}
                </option>
              ))}
            </RHFSelect>
          </Grid>

          <Grid xs={12} md={6}>
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

          <Grid xs={12} md={6}>
            <RHFTextField
              name="additionalCost"
              label="Custo Adicional"
              placeholder='R$ 0,00'
              type="number"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid xs={12} md={12}>
            <RHFTextField
              name="description"
              label="Descrição"
              multiline
              rows={3}
              sx={{ gridColumn: 'span 2' }}
            />
          </Grid>

          <Grid xs={12} md={12}>
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

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!currentServiceOrder ? 'Criar Ordem de Serviço' : 'Salvar Mudanças'}
            </LoadingButton>
          </Stack>
      </Grid>
      <ServiceOrderTypeModal open={typeModal.value} onClose={typeModal.onFalse} />
    </FormProvider>
  );
} 