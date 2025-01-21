'use client';

import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Card, Typography, Divider, MenuItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// components
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFTextField, RHFSelect } from 'src/components/hook-form';
// types
import { createVehicle } from 'src/types/vehicle';
// api
import { createVehicleFunction } from 'src/api/vehicle';
import { useSnackbar } from 'notistack';
// scrollbar
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  clientCPF: string;
  onReload: () => void;
};

export default function VehicleCreateDialogForm({ open, onClose, clientCPF, onReload }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const VehicleSchema = Yup.object().shape({
    licensePlate: Yup.string().required('Placa é obrigatória'),
    model: Yup.string().required('Modelo é obrigatório'),
    brand: Yup.string().required('Marca é obrigatória'),
    modelYear: Yup.number()
      .min(1900, 'Ano inválido')
      .max(new Date().getFullYear(), 'Ano inválido')
      .required('Ano do modelo é obrigatório'),
    color: Yup.string().required('Cor é obrigatória'),
    currentMileage: Yup.number()
      .min(0, 'Quilometragem inválida')
      .required('Quilometragem atual é obrigatória'),
    status: Yup.string().required('Status é obrigatório'),
  });

  const defaultValues = useMemo<createVehicle>(
    () => ({
      licensePlate: '',
      model: '',
      brand: '',
      modelYear: new Date().getFullYear(),
      color: '',
      currentMileage: 0,
      descritpion: '',
      status: 'AVAILABLE',
      clientCPF,
    }),
    [clientCPF]
  );

  const methods = useForm({
    resolver: yupResolver(VehicleSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createVehicleFunction({ ...data, clientCPF });
      enqueueSnackbar('Veículo criado com sucesso!', { variant: 'success' });
      onReload();
      onClose();
    } catch (error) {
      console.error('Erro ao criar veículo', error);
      enqueueSnackbar('Erro ao criar veículo.', { variant: 'error' });
    }
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Adicionar Veículo</DialogTitle>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogContent
          sx={{
            py: 3,
            justifyContent: 'center',
            '& .MuiFormControl-root': { mb: 2 },
          }}
        >
          <Scrollbar
            sx={{
              height: 480,
              '& .simplebar-content': { px: 1, pb: 1 },
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Informações Básicas
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid xs={12} sm={6}>
                      <RHFTextField name="licensePlate" label="Placa" />
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <RHFTextField name="model" label="Modelo" />
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <RHFTextField name="brand" label="Marca" />
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <RHFTextField name="modelYear" label="Ano do Modelo" type="number" />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Detalhes do Veículo
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid xs={12} sm={6}>
                      <RHFTextField name="color" label="Cor" />
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <RHFTextField name="currentMileage" label="Quilometragem Atual" type="number" />
                    </Grid>
                    <Grid xs={12}>
                      <RHFTextField name="descritpion" label="Descrição" multiline rows={3} />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Status
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <RHFSelect name="status" label="Status">
                    <MenuItem value="AVAILABLE">Disponível</MenuItem>
                    <MenuItem value="UNDER_MAINTANCE">Em manutenção</MenuItem>
                    <MenuItem value="WAITING_MAINTENANCE">Aguardando manutenção</MenuItem>
                    <MenuItem value="OUT_OF_SERVICE">Fora de serviço</MenuItem>
                  </RHFSelect>
                </Card>
              </Grid>
            </Grid>
          </Scrollbar>
        </DialogContent>

        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 3,
          }}
        >
          <Button onClick={onClose} variant="outlined" color="error">
            Cancelar
          </Button>
          <LoadingButton type="submit" variant="contained" color="success" loading={isSubmitting}>
            Salvar
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
