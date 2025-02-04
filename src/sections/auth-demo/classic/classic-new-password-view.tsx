'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import FormProvider, { RHFTextField} from 'src/components/hook-form';
// assets
import { SentIcon } from 'src/assets/icons';
import { useParams, useRouter } from 'next/navigation';
import axiosInstance from 'src/utils/axios';
import { useSnackbar } from 'notistack';
import { timer } from 'src/auth/context/jwt/utils';


export default function ClassicNewPasswordView() {
  const password = useBoolean();
  const { enqueueSnackbar } = useSnackbar();
  const {id} = useParams()

  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirmação de senha é obrigatória')
      .oneOf([Yup.ref('password')], 'Os campos de senha e confirmação de senha devem ser iguais'),
  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    try {
      await axiosInstance.post(`/auth/reset-password`,{
        token: id,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })

      enqueueSnackbar('Senha alterada com sucesso', { variant: 'success' });
      await timer(2000);
      router.push(paths.auth.jwt.login);

    } catch (error) {
      console.error(error);
      enqueueSnackbar('Ocorreu um erro ao enviar a requisição.', { variant: 'error' });
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center">

      <RHFTextField
        name="password"
        label="Nova senha"
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

      <RHFTextField
        name="confirmPassword"
        label="Confirmar nova senha"
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
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Atualizar senha
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
        Retornar ao Login
      </Link>
    </Stack>
  );

  const renderHead = (
    <SentIcon sx={{ height: 96 }} />
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
