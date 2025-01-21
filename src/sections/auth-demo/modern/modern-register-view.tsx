'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
// routes
import { paths } from '@/routes/paths';
// components
import Iconify from '@/components/iconify';
import { RouterLink } from '@/routes/components';
import FormProvider, { RHFTextField } from '@/components/hook-form';
import { useAuthContext } from '@/auth/hooks';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function ModernRegisterView() {
  const password = useBoolean();
  const { register } = useAuthContext()
  const {enqueueSnackbar} = useSnackbar()

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register(data.email, data.password)
      
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao efetuar login!', { variant: 'error' });
      reset()
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Registre-se agora</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Você já tem uma conta?</Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
          Faça o login
        </Link>
      </Stack>
    </Stack>
  );


  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="email" label="Endereço de Email" />

      <RHFTextField
        name="password"
        label="Senha"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />



      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        sx={{ justifyContent: 'space-between', pl: 2, pr: 1.5 }}
      >
        Criar conta
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}
      {renderForm}
    </FormProvider>
  );
}
