import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// routes
import { useRouter } from 'src/routes/hooks';
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFTextField } from 'src/components/hook-form';
// api
import { createClient, updateClient } from 'src/api/client';
// types
import { IClient } from 'src/types/client';
import { mutate } from 'swr';
import { endpoints } from '@/utils/axios';
import RenderClientVehicles from '../vehicle/vehicle-client-render';

type Props = {
  currentClient?: IClient | null;
  onClose: VoidFunction;
};

export default function ClientNewEditForm({ currentClient, onClose }: Props) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewClientSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    phoneNumber: Yup.string().required('Telefone é obrigatório'),
    address: Yup.string().required('Endereço é obrigatório'),
    cpf: Yup.string()
      .required('CPF é obrigatório')
      .matches(/^[0-9]{11}$/, 'CPF deve ter 11 dígitos'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentClient?.name || '',
      email: currentClient?.email || '',
      phoneNumber: currentClient?.phoneNumber || '',
      cpf: currentClient?.cpf || '',
      address: currentClient?.address || '',
    }),
    [currentClient]
  );

  const methods = useForm({
    resolver: yupResolver(NewClientSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentClient && currentClient.cpf) {
        await updateClient(currentClient.cpf, data);
        enqueueSnackbar('Cliente atualizado com sucesso!', { variant: 'success' });
      } else {
        await createClient(data);
        enqueueSnackbar('Cliente criado com sucesso!', { variant: 'success' });
      }
      reset();
      onClose();
      router.push('/dashboard/clients');
    } catch (error) {
      enqueueSnackbar('Erro ao salvar cliente.', { variant: 'error' });
    }
  });

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {/* Informações do Cliente */}
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
                <RHFTextField name="name" label="Nome" />
                <RHFTextField name="email" label="Endereço de Email" />
                <RHFTextField name="phoneNumber" label="Telefone" />
                <RHFTextField name="cpf" label="CPF" />
                <RHFTextField name="address" label="Endereço" />
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentClient ? 'Criar Cliente' : 'Salvar Mudanças'}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>


        </Grid>
      </FormProvider>
      {/* Veículos Associados */}
      {currentClient && currentClient.cpf && (
        <Grid xs={12} md={12}>
          <RenderClientVehicles
            clientCPF={currentClient.cpf}
            vehicles={currentClient.vehicles}
            onReload={
              async () => {
                await mutate(endpoints.client.findAll, false)
              }
            }
          />
        </Grid>
      )}
    </>
  );
}
