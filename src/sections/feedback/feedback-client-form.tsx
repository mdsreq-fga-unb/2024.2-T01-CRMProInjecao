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
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';
import { updateFeedback } from 'src/api/feedback';
import { IFeedback } from 'src/types/feedback';
import { mutate } from 'swr';
import { endpoints } from '@/utils/axios';
import { Typography } from '@mui/material';

type Props = {
  feedback: IFeedback;
  onClose?: VoidFunction;
};

export default function FeedbackClientForm({ feedback, onClose }: Props) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const FeedbackSchema = Yup.object().shape({
    description: Yup.string().required('Descrição é obrigatória'),
    rating: Yup.number()
      .required('Avaliação é obrigatória')
      .min(1, 'Avaliação deve ser entre 1 e 5')
      .max(5, 'Avaliação deve ser entre 1 e 5'),
  });

  const defaultValues = useMemo(
    () => ({
      description: feedback?.description || '',
      rating: feedback?.rating || 1,
    }),
    [feedback]
  );

  const methods = useForm({
    resolver: yupResolver(FeedbackSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateFeedback(feedback.id, {
        description: data.description,
        rating: data.rating,
      });
      enqueueSnackbar('Avaliação enviada com sucesso!', { variant: 'success' });
      onClose?.();
      mutate(endpoints.feedback.findAll);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao enviar avaliação', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Sua avaliação é muito importante para nós!
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
              <RHFSelect native name="rating" label="Avaliação">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField
                name="description"
                label="Deixe seu comentário"
                multiline
                rows={3}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Enviar Avaliação
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
} 