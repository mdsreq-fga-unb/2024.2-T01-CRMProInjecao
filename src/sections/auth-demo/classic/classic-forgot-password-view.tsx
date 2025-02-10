'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// assets
import { PasswordIcon } from 'src/assets/icons';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import axiosInstance from 'src/utils/axios';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { timer } from 'src/auth/context/jwt/utils';

// ----------------------------------------------------------------------

export default function ClassicForgotPasswordView() {
  const { enqueueSnackbar } = useSnackbar();
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email é obrigatório').email('Email inválido'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axiosInstance.post('/auth/forgot-password', data);

      enqueueSnackbar(response.data.message, { variant: 'success' });
      await timer(2000);
      router.push(paths.auth.jwt.login);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(
        'Ocorreu um erro ao enviar a requisição, verifique se o e-mail inserido, possui uma conta em nosso sistema.',
        { variant: 'error' }
      );
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField name="email" label="Endereço de Email" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Enviar requisição
      </LoadingButton>

      <Link
        component={RouterLink}
        href={paths.auth.jwt.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Voltar para Login
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <PasswordIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Esqueceu sua senha?</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Por favor, insira o seu endereço de email. Você receberá um link para criar uma nova senha
          via email.
        </Typography>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
