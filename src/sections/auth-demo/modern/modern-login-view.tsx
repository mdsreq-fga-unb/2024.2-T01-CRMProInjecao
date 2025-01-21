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
// routes
import { paths } from '@/routes/paths';
import { RouterLink } from '@/routes/components';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
// components
import Iconify from '@/components/iconify';
import FormProvider, { RHFTextField } from '@/components/hook-form';
import { useAuthContext } from '@/auth/hooks';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

export default function ModernLoginView() {
  const password = useBoolean();

  const { login } = useAuthContext()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email é obrigatório').email('Email deve ser um endereço de email válido'),
    password: Yup.string().required('Senha é obrigatória'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data.email, data.password);
      enqueueSnackbar('Login efetuado com sucesso!');
      router.push(paths.dashboard.root);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao efetuar login', { variant: 'error' });

    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">Novo usuário?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
          Crie uma conta
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
        Login
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
