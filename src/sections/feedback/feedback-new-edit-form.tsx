import * as Yup from 'yup';
import { useMemo } from 'react';
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
import { createFeedback, updateFeedback } from 'src/api/feedback';
import { IFeedback } from 'src/types/feedback';
import { mutate } from 'swr';
import { endpoints } from '@/utils/axios';
import { useGetClients } from '@/api/client';
import { CircularProgress } from '@mui/material';
import { useGetServiceOrders } from '@/api/service-order';

type Props = {
  currentFeedback?: IFeedback | null;
  onClose: VoidFunction;
};

export default function FeedbackNewEditForm({ currentFeedback, onClose }: Props) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { clients, clientsLoading } = useGetClients();
  const { serviceOrders } = useGetServiceOrders();

  const NewFeedbackSchema = Yup.object().shape({
    clientCPF: Yup.string()
      .min(11, "CPF inválido")
      .required('Cliente é obrigatório'),
    serviceOrderIds: Yup.array().of(Yup.string()),
  });

  const defaultValues = useMemo(
    () => ({
      clientCPF: currentFeedback?.client.cpf || '',
      serviceOrderIds: currentFeedback?.serviceOrders.map((so) => so.id) || [],
    }),
    [currentFeedback]
  );

  const methods = useForm({
    resolver: yupResolver(NewFeedbackSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const selectedClientCPF = watch('clientCPF');

  const filteredServiceOrders = useMemo(() => {
    if (!selectedClientCPF) return [];
    return serviceOrders.filter((so) => so.client.cpf === selectedClientCPF);
  }, [serviceOrders, selectedClientCPF]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentFeedback) {
        await updateFeedback(currentFeedback.id, {
          clientCPF: data.clientCPF,
          serviceOrderIds: (data.serviceOrderIds || []).filter((id): id is string => !!id),
        });
        enqueueSnackbar('Feedback atualizado com sucesso!', { variant: 'success' });
      } else {
        await createFeedback({
          clientCPF: data.clientCPF,
          serviceOrderIds: (data.serviceOrderIds || []).filter((id): id is string => !!id),
          rating: 1, // valor inicial, será atualizado pelo cliente
          description: '', // valor inicial, será atualizado pelo cliente
        });
        enqueueSnackbar('Feedback criado com sucesso!', { variant: 'success' });
      }
      reset();
      onClose();
      router.push('/dashboard/feedbacks');
      mutate(endpoints.feedback.findAll);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao salvar feedback', { variant: 'error' });
    }
  });

  if (clientsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFSelect native name="clientCPF" label="Cliente">
                <option value="" label='Selecione um cliente' />
                {clients?.map((client) => (
                  <option key={client.cpf} value={client.cpf}>
                    {client.name} - CPF: {client.cpf}
                  </option>
                ))}
              </RHFSelect>

              {
                selectedClientCPF && (
                  <RHFMultiSelect
                    options={filteredServiceOrders.map((so) => ({
                      label: `OS #${so.id} - ${so.description}`,
                      value: so.id,
                    }))}
                    name="serviceOrderIds"
                    label="Ordens de Serviço"
                    disabled={!selectedClientCPF}
                    placeholder='Selecione as ordens de serviço'
                  />
                )
              }
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentFeedback ? 'Criar Feedback' : 'Salvar Mudanças'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
} 