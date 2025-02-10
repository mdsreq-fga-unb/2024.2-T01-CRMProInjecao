'use client';

import * as Yup from 'yup';
import { useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  Typography,
  Divider,
  MenuItem,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// components
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFTextField, RHFSelect } from 'src/components/hook-form';
// types
import { IVehicle, IupdateVehicle } from 'src/types/vehicle';
// api
import { updateVehicle } from 'src/api/vehicle';
import { useSnackbar } from 'notistack';
// scrollbar
import Scrollbar from 'src/components/scrollbar';
import { mutate } from 'swr';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  vehicle: IVehicle | null;
  vehicleLoading: boolean;
  vehicleError: any;
  licensePlate: string;
  onReload: () => void;
};

export default function VehicleEditDialogForm({
  open,
  onClose,
  vehicle,
  licensePlate,
  onReload,
  vehicleLoading,
  vehicleError,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const VehicleSchema = Yup.object().shape({
    licensePlate: Yup.string().notRequired(),
    model: Yup.string().notRequired(),
    brand: Yup.string().notRequired(),
    modelYear: Yup.number()
      .min(1900, 'Ano inválido')
      .max(new Date().getFullYear(), 'Ano inválido')
      .notRequired(),
    color: Yup.string().notRequired(),
    currentMileage: Yup.number().min(0, 'Quilometragem inválida').notRequired(),
    status: Yup.string().notRequired(),
  });

  const defaultValues = useMemo<IupdateVehicle>(
    () => ({
      licensePlate: vehicle?.licensePlate || '',
      model: vehicle?.model || '',
      brand: vehicle?.brand || '',
      modelYear: vehicle?.modelYear || new Date().getFullYear(),
      color: vehicle?.color || '',
      currentMileage: vehicle?.currentMileage || 0,
      descritpion: vehicle?.descritpion || '',
      status: vehicle?.status || 'AVAILABLE',
    }),
    [vehicle]
  );

  const methods = useForm({
    resolver: yupResolver(VehicleSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (vehicle) {
      reset(defaultValues);
    }
  }, [vehicle, reset, defaultValues]);

  function removeNullAndUndefined(obj: any): IupdateVehicle {
    return JSON.parse(JSON.stringify(obj));
  }
  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateVehicle(
        licensePlate,
        removeNullAndUndefined({
          ...data,
        })
      );
      enqueueSnackbar('Veículo atualizado com sucesso!', { variant: 'success' });
      onReload();
      await mutate(`/vehicles/${licensePlate}`);
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar veículo', error);
      enqueueSnackbar('Erro ao atualizar veículo.', { variant: 'error' });
    }
  });

  if (vehicleLoading) {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Carregando...</DialogTitle>
        <DialogContent>
          <Typography>Carregando informações do veículo...</Typography>
        </DialogContent>
      </Dialog>
    );
  }

  if (vehicleError) {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Erro</DialogTitle>
        <DialogContent>
          <Typography color="error">Erro ao carregar informações do veículo.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="error">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Editar Veículo</DialogTitle>

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
                      <RHFTextField
                        name="currentMileage"
                        label="Quilometragem Atual"
                        type="number"
                      />
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
