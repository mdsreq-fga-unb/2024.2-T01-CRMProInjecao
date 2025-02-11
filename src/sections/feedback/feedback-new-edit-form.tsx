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
import FormProvider, { RHFSelect, RHFMultiSelect } from 'src/components/hook-form';
import { createFeedback, updateFeedback } from 'src/api/feedback';
import { IFeedback } from 'src/types/feedback';
import { mutate } from 'swr';
import { endpoints } from '@/utils/axios';
import { useGetClients } from '@/api/client';
import { CircularProgress, InputAdornment, Tooltip, TextField, Typography, Rating, Divider, IconButton } from '@mui/material';
import { useGetServiceOrders } from '@/api/service-order';
import Iconify from '@/components/iconify';

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

  const hasClientFeedback = currentFeedback && (currentFeedback.description !== '' || currentFeedback.rating > 1);

  const defaultValues = useMemo(
    () => ({
      clientCPF: currentFeedback?.client.cpf || '',
      serviceOrderIds: currentFeedback?.serviceOrders.map((so) => so.id) || [],
      description: currentFeedback?.description || '',
      rating: currentFeedback?.rating || 0,
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

  const generateFeedbackLink = (feedbackId: number, clientCPF: string) => {
    const data = {
      feedbackId,
      clientCPF,
    };
    const token = Buffer.from(JSON.stringify(data)).toString('base64');
    const baseUrl = window.location.origin;
    return `${baseUrl}/feedback?token=${token}`;
  };

  const handleCopyLink = () => {
    if (currentFeedback) {
      const link = generateFeedbackLink(currentFeedback.id, currentFeedback.client.cpf);
      navigator.clipboard.writeText(link);
      enqueueSnackbar('Link copiado para a área de transferência!');
    }
  };

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
            {hasClientFeedback ? (
              <>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Avaliação do Cliente
                </Typography>

                <Stack spacing={3}>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Cliente
                    </Typography>
                    <Typography variant="body2">
                      {currentFeedback.client.name} - CPF: {currentFeedback.client.cpf}
                    </Typography>
                  </Box>


                  <Divider />

                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Nota
                    </Typography>
                    <Rating value={currentFeedback.rating} readOnly />
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Comentário
                    </Typography>
                    <Typography variant="body2">
                      {currentFeedback.description}
                    </Typography>
                  </Box>

                  <TextField
                    fullWidth
                    label="Link para Feedback"
                    value={generateFeedbackLink(currentFeedback.id, currentFeedback.client.cpf)}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="Copiar Link">
                            <IconButton onClick={handleCopyLink} edge="end">
                              <Iconify icon="eva:copy-fill" />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </>
            ) : (
              <>
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
                    native
                    name="clientCPF"
                    label="Cliente"
                    disabled={!!(currentFeedback && currentFeedback.id)}
                  >
                    <option value="" label='Selecione um cliente' />
                    {clients?.map((client) => (
                      <option key={client.cpf} value={client.cpf}>
                        {client.name} - CPF: {client.cpf}
                      </option>
                    ))}
                  </RHFSelect>

                  {selectedClientCPF && currentFeedback && (
                    <RHFMultiSelect
                      options={filteredServiceOrders.map((so) => ({
                        label: `OS #${so.id} - ${so.type.name}`,
                        value: so.id,
                      }))}
                      name="serviceOrderIds"
                      label="Ordens de Serviço"
                      disabled={!!(currentFeedback && currentFeedback.id)}
                      placeholder='Selecione as ordens de serviço'
                    />
                  )}
                </Box>

                {currentFeedback && (
                  <TextField
                    fullWidth
                    label="Link para Feedback"
                    value={generateFeedbackLink(currentFeedback.id, currentFeedback.client.cpf)}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="Copiar Link">
                            <IconButton onClick={handleCopyLink} edge="end">
                              <Iconify icon="eva:copy-fill" />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mt: 3 }}
                  />
                )}

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    disabled={!!(currentFeedback && currentFeedback.id)}
                  >
                    {!currentFeedback ? 'Criar Feedback' : 'Salvar Mudanças'}
                  </LoadingButton>
                </Stack>
              </>
            )}
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
} 