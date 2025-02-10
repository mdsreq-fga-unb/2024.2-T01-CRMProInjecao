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
import { RHFTextField, RHFSelect, RHFSwitch } from 'src/components/hook-form';
// api
import { createUser, updateUser } from 'src/api/user';
// types
import { IUser } from 'src/types/user';
import { mutate } from 'swr';
import { endpoints } from '@/utils/axios';
import { MenuItem } from '@mui/material';

const roleOptions = [
  { value: 1, label: 'Administrador' },
  { value: 2, label: 'Usuário' },
];

const statusOptions = [
  { value: true, label: 'Ativo' },
  { value: false, label: 'Inativo' },
];

type Props = {
  currentUser?: IUser | null;
  onClose: VoidFunction;
};

export default function UserNewEditForm({ currentUser, onClose }: Props) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    role: Yup.number().required('Papel é obrigatório'),
    isActive: Yup.boolean().required('Status é obrigatório'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      role: currentUser?.role || 2,
      isActive: currentUser?.isActive || true,
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentUser) {
        await updateUser(currentUser.id, {
          name: data.name,
          email: data.email,
          role: data.role,
          isActive: data.isActive,
        });
      } else {
        await createUser({
          email: data.email,
          name: data.name,
          role: data.role,
          isActive: data.isActive,
        });
      }
      await mutate(endpoints.user.findAll);
      enqueueSnackbar('Usuário salvo com sucesso', { variant: 'success' });
      onClose();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao salvar usuário', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <RHFTextField name="name" label="Nome" />
            </Grid>

            <Grid xs={12} md={6}>
              <RHFTextField name="email" label="E-mail" />
            </Grid>

            <Grid xs={12} md={6}>
              <RHFSelect name="role" label="Papel">
                {roleOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>

            <Grid xs={12} md={6}>
              <RHFSwitch name="isActive" label="Status do Usuário" />
            </Grid>
          </Grid>
          <Stack direction="row" spacing={1.5} justifyContent="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Salvar
            </LoadingButton>
          </Stack>
        </Box>
      </Card>
    </FormProvider>
  );
}
