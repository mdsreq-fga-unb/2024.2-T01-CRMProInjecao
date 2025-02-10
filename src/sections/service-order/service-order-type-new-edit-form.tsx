import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { createServiceOrderType, updateServiceOrderType } from 'src/api/service-order';
import { IServiceOrderType } from '@/types/service-order';
import { mutate } from 'swr';
import { endpoints } from '@/utils/axios';

type Props = {
  currentType?: IServiceOrderType | null;
  onClose: VoidFunction;
};

export default function ServiceOrderTypeNewEditForm({ currentType, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const NewTypeSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    description: Yup.string().required('Descrição é obrigatória'),
    price: Yup.number().min(0, 'Preço deve ser positivo').required('Preço é obrigatório'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentType?.name || '',
      description: currentType?.description || '',
      price: currentType?.price || 0,
    }),
    [currentType]
  );

  const methods = useForm({
    resolver: yupResolver(NewTypeSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentType) {
        await updateServiceOrderType(currentType.id, data);
        enqueueSnackbar('Tipo atualizado com sucesso!', { variant: 'success' });
      } else {
        await createServiceOrderType(data);
        enqueueSnackbar('Tipo criado com sucesso!', { variant: 'success' });
      }
      reset();
      onClose();
      mutate(`${endpoints.serviceOrder.findAll}/type`);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao salvar tipo', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
        }}
      >
        <RHFTextField name="name" label="Nome" />
        <RHFTextField name="description" label="Descrição" multiline rows={3} />
        <RHFTextField
          name="price"
          label="Preço Base"
          type="number"
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {!currentType ? 'Criar Tipo' : 'Salvar Mudanças'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
} 