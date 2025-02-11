import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
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

// types
import { IProduct } from 'src/types/product';
import { ICategory } from '@/types/category';

type Props = {
  currentProduct?: IProduct | null;
  categories: ICategory[];
  onClose: VoidFunction;
};

export default function ProductNewEditForm({ currentProduct, onClose }: Props) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // const NewProductSchema = Yup.object().shape({
  //   name: Yup.string().required('Nome é obrigatório'),
  //   desciption: Yup.string(),
  //   brand: Yup.string(),
  //   costPrice: Yup.number().required('Preço de custo é obrigatório'),
  //   sellPrice: Yup.number().required('Preço de venda é obrigatório'),
  //   categories: Yup.array()
  //     .of(Yup.string().required('Categoria é obrigatória'))
  //     .min(1, 'Pelo menos uma categoria é obrigatória'),
  // });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      brand: currentProduct?.brand || '',
      costPrice: currentProduct?.costPrice || 0,
      sellPrice: currentProduct?.sellPrice || 0,
      categories: currentProduct?.categories?.map((i) => i.id) || [],
    }),
    [currentProduct]
  );

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    // watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      // if (currentProduct && currentProduct.cpf) {
      // await updateClient(currentProduct.cpf, data);
      //   enqueueSnackbar('Cliente atualizado com sucesso!', { variant: 'success' });
      // } else {
      // await createClient(data);
      //   enqueueSnackbar('Cliente criado com sucesso!', { variant: 'success' });
      // }
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

          {/* <RHFSelect>{ }</RHFSelect> */}
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
                  {!currentProduct ? 'Criar Cliente' : 'Salvar Mudanças'}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
      {/* Veículos Associados */}
      {/* {currentProduct && currentProduct.cpf && (
        <Grid xs={12} md={12}>
          <RenderClientVehicles
            clientCPF={currentProduct.cpf}
            vehicles={currentProduct.vehicles}
            onReload={async () => {
              await mutate(endpoints.client.findAll, false);
            }}
          />
        </Grid>
      )} */}
    </>
  );
}
