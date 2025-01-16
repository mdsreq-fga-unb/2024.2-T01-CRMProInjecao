'use client';

import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
// routes
import { paths } from '@/routes/paths';
import { RouterLink } from '@/routes/components';
import { useSearchParams, useRouter } from '@/routes/hooks';
// config
import { PATH_AFTER_REGISTER } from '@/config-global';
// auth
import { useAuthContext } from '@/auth/hooks';
// components
import Iconify from '@/components/iconify';
import FormProvider, { RHFSelect, RHFTextField, RHFUploadAvatar } from '@/components/hook-form';
import axiosInstance, { endpoints } from '@/utils/axios';
import { fData } from '@/utils/format-number';
import { DatePicker } from '@mui/x-date-pickers';
import { MenuItem } from '@mui/material';

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const { register } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().nullable().required('Nome é preciso'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    phone: Yup.string().nullable().min(10).required('Celular é preciso'),
    cpf: Yup.string().nullable().required('CPF é preciso'),
    birthdate: Yup.string().nullable().required('Data nascimento é preciso'),
    sex: Yup.string().nullable().required('sex é preciso'),
    // not required
    profilePhoto: Yup.string().nullable().required('Foto é preciso'),
  });

  const defaultValues = {
    name: '',
    email: '',
    password: '',
    phone: '',
    cpf: '',
    birthdate: '',
    sex: '',
    profilePhoto: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log('21');

    try {
      await register?.(
        data.name,
        data.email,
        data.password,
        data.phone,
        data.cpf,
        data.birthdate,
        data.sex,
        data.profilePhoto
      );

      router.push(returnTo || PATH_AFTER_REGISTER);
    } catch (error) {
      console.error(error);
      setErrorMsg('Falha ao registrar usuário');
      reset();
    }
  });

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        try {
          const { data } = await axiosInstance.post(endpoints.images.upload, formData);

          setValue('profilePhoto', data.imageUrl, { shouldValidate: true });
        } catch (error) {
          setErrorMsg('Falha ao enviar foto');
          setValue('profilePhoto', '', { shouldValidate: false });
        }
      }
    },
    [setValue]
  );

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 2.5, position: 'relative' }}>
      <Typography variant="h4">Crie sua conta agora</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Você já tem uma conta? </Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
          Entrar
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        color: 'text.secondary',
        mt: 2.5,
        typography: 'caption',
        textAlign: 'center',
      }}
    >
      {'Ao criar uma conta, você concorda com os '}
      <Link underline="always" color="text.primary">
        Termos de uso
      </Link>
      {' e a '}
      <Link underline="always" color="text.primary">
        Política de privacidade
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <RHFUploadAvatar
          name="profilePhoto"
          maxSize={3145728}
          onDrop={handleDrop}
          helperText={
            <Typography
              variant="caption"
              sx={{
                mt: 3,
                mx: 'auto',
                display: 'block',
                textAlign: 'center',
                color: 'text.disabled',
              }}
            >
              Permitido *.jpeg, *.jpg, *.png, *.gif
              <br /> Tamanho máximo {fData(3145728)}
            </Typography>
          }
        />
        <RHFTextField required name="name" label="Nome Completo" />
        <RHFTextField required name="phone" label="Telefone" />
        <RHFTextField required name="cpf" label="CPF" />
        <Controller
          name="birthdate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              value={new Date(field.value as any)}
              onChange={(newValue) => {
                if (newValue) {
                  const day = String(newValue.getDate()).padStart(2, '0');
                  const month = String(newValue.getMonth() + 1).padStart(2, '0');
                  const year = newValue.getFullYear();
                  field.onChange(`${month}/${day}/${year}`);
                }
              }}
              label="Data de Nascimento"
              format="MM/dd/yyyy"
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
          )}
        />
        <RHFSelect required name="sex" label="Sexo">
          {[
            ['M', 'Masculino'],
            ['F', 'Feminino'],
            ['O', 'Outros'],
          ].map((option) => (
            <MenuItem key={option[0]} value={option[0]}>
              {option[1]}
            </MenuItem>
          ))}
        </RHFSelect>

        <RHFTextField name="email" label="Email" />

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
        >
          Criar conta
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {renderForm}

      {renderTerms}
    </>
  );
}
