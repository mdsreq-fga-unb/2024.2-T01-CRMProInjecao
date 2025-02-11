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
import { createBudget, updateBudget } from 'src/api/budget';
import { IBudget, BudgetStatus } from 'src/types/budget';
import useSWR, { mutate } from 'swr';
import { endpoints, fetcher } from '@/utils/axios';
import { useGetClients } from '@/api/client';
import { CircularProgress, Typography, Divider, IconButton, Button, MenuItem } from '@mui/material';
import { useGetProductsByFilter } from '@/api/product';
import { useGetServiceOrderTypes } from '@/api/service-order';
import { IVehicle } from '@/types/vehicle';
import { fCurrency } from '@/utils/format-number';
import Scrollbar from 'src/components/scrollbar';
import { usePopover } from '@/components/custom-popover';
import Label from '@/components/label';
import { ConfirmDialog } from '@/components/custom-dialog';
import { useBoolean } from '@/hooks/use-boolean';
import ServiceHistoryTimeline from '@/components/service-history/service-history-timeline';
import { useGetServiceHistoryByBudget } from '@/api/service-history';

type Props = {
  currentBudget?: IBudget | null;
  onClose: VoidFunction;
};

// Hook personalizado para veículos filtrados
const useFilteredVehicles = (clientCPF: string) => {
  const { data: vehicles, isLoading } = useSWR(
    clientCPF ? `${endpoints.vehicle.findAll}?clientCPF=${clientCPF}` : null,
    fetcher
  );

  return {
    vehicles: vehicles as IVehicle[] || [],
    vehiclesLoading: isLoading,
  };
};

export default function BudgetNewEditForm({ currentBudget, onClose }: Props) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [totalCost, setTotalCost] = useState(0);

  const { clients, clientsLoading } = useGetClients();
  const { serviceOrderTypes, serviceOrderTypesLoading } = useGetServiceOrderTypes();
  const { products, productsLoading } = useGetProductsByFilter(null, null);

  const { serviceHistory, serviceHistoryLoading } = useGetServiceHistoryByBudget(
    currentBudget?.id || null
  );

  const NewBudgetSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    description: Yup.string().required('Descrição é obrigatória'),
    initialCost: Yup.number().min(0, 'Valor deve ser positivo'),
    additionalCost: Yup.number().min(0, 'Valor deve ser positivo'),
    clientCPF: Yup.string().required('Cliente é obrigatório'),
    vehicleLicensePlate: Yup.string().required('Veículo é obrigatório'),
    serviceTypeIds: Yup.array().min(1, 'Selecione pelo menos um tipo de serviço'),
    productIds: Yup.array().of(Yup.string()),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentBudget?.name || '',
      description: currentBudget?.description || '',
      initialCost: currentBudget?.initialCost ? parseFloat(String(currentBudget.initialCost)) : 0,
      additionalCost: currentBudget?.additionalCost ? parseFloat(String(currentBudget.additionalCost)) : 0,
      clientCPF: currentBudget?.client.cpf || '',
      vehicleLicensePlate: currentBudget?.vehicle.licensePlate || '',
      serviceTypeIds: currentBudget?.serviceTypes.map((type) => type.id) || [],
      productIds: currentBudget?.products.map((product) => product.id) || [],
    }),
    [currentBudget]
  );

  const methods = useForm({
    resolver: yupResolver(NewBudgetSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  const selectedClientCPF = watch('clientCPF');
  const { vehicles, vehiclesLoading } = useFilteredVehicles(selectedClientCPF);

  const confirm = useBoolean();
  const [confirmAction, setConfirmAction] = useState<(() => Promise<void>) | null>(null);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmContent, setConfirmContent] = useState('');
  const [confirmButtonColor, setConfirmButtonColor] = useState<'error' | 'success'>('success');

  // Calcula o custo total em tempo real
  useEffect(() => {
    const calculateTotal = async () => {
      let total = 0;

      // Soma custos base
      total += parseFloat(String(values.initialCost)) || 0;
      total += parseFloat(String(values.additionalCost)) || 0;

      // Soma o preço dos tipos de serviço selecionados
      const selectedTypes = serviceOrderTypes?.filter((type) => 
        values.serviceTypeIds?.includes(type.id)
      ) || [];
      
      total += selectedTypes.reduce((sum, type) => {
        const typePrice = parseFloat(String(type.price)) || 0;
        return sum + typePrice;
      }, 0);

      // Soma o preço dos produtos selecionados
      const selectedProducts = products?.filter((product) => 
        values.productIds?.includes(product.id)
      ) || [];
      
      total += selectedProducts.reduce((sum, product) => {
        const productPrice = parseFloat(String(product.sellPrice)) || 0;
        return sum + productPrice;
      }, 0);

      setTotalCost(Number(total.toFixed(2)));
    };

    calculateTotal();
  }, [values, serviceOrderTypes, products]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const cleanData = {
        ...data,
        initialCost: parseFloat(String(data.initialCost)) || 0,
        additionalCost: parseFloat(String(data.additionalCost)) || 0,
        productIds: data.productIds?.filter((id): id is string => id !== undefined),
        serviceTypeIds: data.serviceTypeIds?.filter((id): id is string => id !== undefined)
      };

      if (currentBudget) {
        await updateBudget(currentBudget.id, cleanData);
        enqueueSnackbar('Orçamento atualizado com sucesso!', { variant: 'success' });
      } else {
        await createBudget(cleanData);
        enqueueSnackbar('Orçamento criado com sucesso!', { variant: 'success' });
      }
      reset();
      onClose();
      mutate(endpoints.budget.findAll);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao salvar orçamento', { variant: 'error' });
    }
  });

  const handleConfirmAction = async () => {
    try {
      if (confirmAction) {
        await confirmAction();
      }
      confirm.onFalse();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAcceptBudget = async () => {
    try {
      await updateBudget(currentBudget!.id, {
        status: BudgetStatus.ACCEPTED,
      });
      enqueueSnackbar('Orçamento aceito com sucesso!', { variant: 'success' });
      mutate(endpoints.budget.findAll);
      onClose();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao aceitar orçamento', { variant: 'error' });
    }
  };

  const handleCancelBudget = async () => {
    try {
      await updateBudget(currentBudget!.id, {
        status: BudgetStatus.CANCELED,
      });
      enqueueSnackbar('Orçamento cancelado com sucesso!', { variant: 'success' });
      mutate(endpoints.budget.findAll);
      onClose();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao cancelar orçamento', { variant: 'error' });
    }
  };

  const renderServiceOrders = () => {
    if (!currentBudget?.serviceOrders?.length) return null;

    return (
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Ordens de Serviço Geradas
        </Typography>
        <Scrollbar sx={{ maxHeight: 280 }}>
          {currentBudget.serviceOrders.map((order, index) => (
            <Box
              key={order.id}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 1,
                position: 'relative',
                bgcolor: 'background.neutral',
                '&:last-child': { mb: 0 },
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Ordem #{index + 1} - {order.type.name}
              </Typography>
              
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {order.description}
                </Typography>
                
                {order.products && order.products.length > 0 && (
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Produtos:
                    </Typography>
                    {order.products.map((product) => (
                      <Typography key={product.id} variant="body2">
                        • {product.name} - {fCurrency(product.sellPrice)}
                      </Typography>
                    ))}
                  </Box>
                )}
                
                {order.additionalCost && order.additionalCost > 0 ? (
                  <Typography variant="body2">
                    Custo Adicional: {fCurrency(order.additionalCost)}
                  </Typography>
                ) : (
                  <Typography variant="body2">
                    Custo Adicional: Não há custo adicional
                  </Typography>
                )}
              </Stack>
            </Box>
          ))}
        </Scrollbar>
      </Card>
    );
  };

  // Verifica se o orçamento pode ser editado
  const isEditable = !currentBudget || currentBudget.status === BudgetStatus.PENDING;

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
          {/* Status e Ações */}
          {currentBudget && (
            <Card sx={{ p: 3, mb: 3 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
                <Typography variant="h6">Status</Typography>
                <Label
                  variant="soft"
                  color={
                    (currentBudget.status === BudgetStatus.ACCEPTED && 'success') ||
                    (currentBudget.status === BudgetStatus.CANCELED && 'error') ||
                    'warning'
                  }
                >
                  {currentBudget.status === BudgetStatus.ACCEPTED && 'Aceito'}
                  {currentBudget.status === BudgetStatus.CANCELED && 'Cancelado'}
                  {currentBudget.status === BudgetStatus.PENDING && 'Pendente'}
                </Label>
              </Stack>

              {currentBudget.status === BudgetStatus.PENDING && (
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button
                    color="error"
                    onClick={() => {
                      setConfirmAction(() => handleCancelBudget);
                      setConfirmTitle('Cancelar Orçamento');
                      setConfirmContent('Tem certeza que deseja cancelar este orçamento?');
                      setConfirmButtonColor('error');
                      confirm.onTrue();
                    }}
                  >
                    Recusar
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      setConfirmAction(() => handleAcceptBudget);
                      setConfirmTitle('Aceitar Orçamento');
                      setConfirmContent(
                        'Ao aceitar o orçamento, serão geradas ordens de serviço automaticamente. Deseja continuar?'
                      );
                      setConfirmButtonColor('success');
                      confirm.onTrue();
                    }}
                  >
                    Aceitar
                  </Button>
                </Stack>
              )}
            </Card>
          )}

          {/* Ordens de Serviço (se aceito) */}
          {currentBudget?.status === BudgetStatus.ACCEPTED && renderServiceOrders()}

          {/* Informações Básicas */}
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Informações Básicas
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
                name="name" 
                label="Nome do Orçamento" 
                fullWidth 
                sx={{ gridColumn: 'span 2' }}
                disabled={!isEditable}
              />
              <RHFTextField
                name="description"
                label="Descrição"
                multiline
                rows={3}
                sx={{ gridColumn: 'span 2' }}
                disabled={!isEditable}
              />
            </Box>
          </Card>

          {/* Cliente e Veículo */}
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Cliente e Veículo
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
              <RHFSelect
                name="clientCPF"
                label="Cliente"
                disabled={!isEditable}
              >
                <MenuItem value="" />
                {clients?.map((client) => (
                  <MenuItem key={client.cpf} value={client.cpf}>
                    {client.name} - {client.cpf}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect
                name="vehicleLicensePlate"
                label="Veículo"
                disabled={vehiclesLoading || !selectedClientCPF || !isEditable}
              >
                <MenuItem value="" />
                {vehicles?.map((vehicle) => (
                  <MenuItem key={vehicle.licensePlate} value={vehicle.licensePlate}>
                    {vehicle.model} - {vehicle.licensePlate}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Box>
          </Card>

          {/* Serviços e Produtos */}
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Serviços e Produtos
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
              <RHFMultiSelect
                name="serviceTypeIds"
                label="Tipos de Serviço"
                options={serviceOrderTypes?.map((type) => ({
                  label: `${type.name} - ${fCurrency(type.price)}`,
                  value: type.id,
                }))}
                checkbox
                disabled={!isEditable}
                sx={{ gridColumn: 'span 2' }}
              />

              <RHFMultiSelect
                name="productIds"
                label="Produtos"
                options={products?.map((product) => ({
                  label: `${product.name} - ${fCurrency(product.sellPrice)}`,
                  value: product.id,
                }))}
                checkbox
                disabled={!isEditable}
                sx={{ gridColumn: 'span 2' }}
              />
            </Box>
          </Card>

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
                name="initialCost"
                label="Custo Inicial"
                type="number"
                InputLabelProps={{ shrink: true }}
                disabled={!isEditable}
              />

              <RHFTextField
                name="additionalCost"
                label="Custo Adicional"
                type="number"
                InputLabelProps={{ shrink: true }}
                disabled={!isEditable}
              />

              <Box sx={{ gridColumn: 'span 2' }}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" sx={{ textAlign: 'right' }}>
                  Valor Total: {fCurrency(totalCost)}
                </Typography>
              </Box>
            </Box>

            {isEditable && (
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentBudget ? 'Criar Orçamento' : 'Salvar Mudanças'}
                </LoadingButton>
              </Stack>
            )}
          </Card>
        </Grid>

        
      </Grid>

      {/* Diálogo de confirmação */}
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={confirmTitle}
        content={confirmContent}
        action={
          <Button
            variant="contained"
            color={confirmButtonColor}
            onClick={handleConfirmAction}
          >
            {confirmTitle.split(' ')[0]}
          </Button>
        }
      />
    </FormProvider>
  );
} 