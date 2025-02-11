import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { createClientFeedback } from 'src/api/feedback';
import { Typography, Rating } from '@mui/material';

type Props = {
  client: any;
  serviceOrder: any;
};

const FeedbackSchema = Yup.object().shape({
  rating: Yup.number().required('Avaliação é obrigatória').min(1).max(5),
  description: Yup.string(),
});

export default function FeedbackClientForm({ client, serviceOrder }: Props) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const hasFeedback = useMemo(() => serviceOrder.feedback &&
      (serviceOrder.feedback.description !== '' || serviceOrder.feedback.rating > 1), [serviceOrder]);

  const methods = useForm({
    resolver: yupResolver(FeedbackSchema),
    defaultValues: {
      rating: serviceOrder.feedback?.rating || 0,
      description: serviceOrder.feedback?.description || '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      await createClientFeedback({
        ...data,
        clientCPF: client.cpf,
      });
      enqueueSnackbar('Feedback enviado com sucesso!');
      router.back();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao enviar feedback', { variant: 'error' });
    }
  };

  return (
    <>
      {hasFeedback ? (
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Obrigado pelo seu feedback!
          </Typography>

          <Stack spacing={3}>
            <div>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Sua avaliação
              </Typography>
              <Rating
                name="rating"
                value={serviceOrder.feedback.rating}
                readOnly
              />
            </div>

            {serviceOrder.feedback.description && (
              <div>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Seu comentário
                </Typography>
                <Typography variant="body2">
                  {serviceOrder.feedback.description}
                </Typography>
              </div>
            )}
          </Stack>
        </Card>
      ) : (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Card sx={{ p: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Deixe sua avaliação sobre o seu último serviço
            </Typography>

            <Stack spacing={3}>
              <div>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Avaliação
                </Typography>
                <Rating
                  name="rating"
                  value={methods.watch('rating')}
                  onChange={(_, value) => {
                    methods.setValue('rating', value || 0);
                  }}
                />
              </div>

              <RHFTextField
                name="description"
                label="Comentário (opcional)"
                multiline
                rows={4}
              />

              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Enviar Avaliação
              </LoadingButton>
            </Stack>
          </Card>
        </FormProvider>
      )}
    </>
  );
} 