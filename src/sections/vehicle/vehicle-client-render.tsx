'use client';

import { useEffect, useState } from 'react';
// @mui
import { Box, Card, IconButton, Tooltip, Typography, Stack, Button } from '@mui/material';
// types
import { IVehicle } from 'src/types/vehicle';
import Iconify from '@/components/iconify';
import { ConfirmDialog } from '@/components/custom-dialog';
import { useBoolean } from '@/hooks/use-boolean';
import { deleteVehicle } from '@/api/vehicle';
import { useSnackbar } from 'notistack';
import VehicleEditDialogForm from './vehicle-edit-dialog-form';
import VehicleCreateDialogForm from './vehicle-create-dialog-form';

// ----------------------------------------------------------------------

type Props = {
  vehicles: IVehicle[];
  clientCPF: string;
  onReload: () => void; // Função para recarregar os dados após criação, edição ou exclusão
};

export default function RenderClientVehicles({ vehicles, clientCPF, onReload }: Props) {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<IVehicle | null>(null);
  const confirmDelete = useBoolean();
  const { enqueueSnackbar } = useSnackbar();

  // Função para abrir o diálogo de criação
  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  // Função para fechar o diálogo de criação
  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  // Função para abrir o diálogo de edição
  const handleOpenEditDialog = (vehicle: IVehicle) => {
    setSelectedVehicle(vehicle);
    setOpenEditDialog(true);
  };

  // Função para fechar o diálogo de edição
  const handleCloseEditDialog = () => {
    setSelectedVehicle(null);
    setOpenEditDialog(false);
  };

  // Atualiza os veículos ao carregar ou após remoção
  useEffect(() => {
    if (vehicles.length === 0) {
      onReload();
    }
  }, [vehicles, onReload]);

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Veículos Associados</Typography>
          <Tooltip title="Adicionar Veículo" arrow>
            <IconButton onClick={handleOpenCreateDialog}>
              <Iconify icon="mdi:plus" width={24} height={24} />
            </IconButton>
          </Tooltip>
        </Box>

        {vehicles.length > 0 ? (
          <Stack spacing={2}>
            {vehicles.map((vehicle) => (
              <Box
                key={vehicle.licensePlate}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={2}
                borderRadius={1}
                sx={{ backgroundColor: 'background.neutral' }}
              >
                <Box>
                  <Typography variant="subtitle2">
                    {vehicle.model} - {vehicle.brand} ({vehicle.modelYear})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Placa: {vehicle.licensePlate} | Cor: {vehicle.color}
                  </Typography>
                </Box>
                <Box display="flex" gap={1}>
                  <Tooltip title="Editar" arrow>
                    <IconButton onClick={() => handleOpenEditDialog(vehicle)}>
                      <Iconify icon="mdi:pencil" width={24} height={24} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir" arrow>
                    <IconButton
                      color="error"
                      onClick={() => {
                        // Função de exclusão do veículo
                        console.log(`Excluir veículo: ${vehicle.licensePlate}`);
                        confirmDelete.onTrue();
                        setSelectedVehicle(vehicle);
                        onReload();
                      }}
                    >
                      <Iconify icon="mdi:trash-can" width={24} height={24} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Nenhum veículo associado.
          </Typography>
        )}

        {openCreateDialog && (
          <VehicleCreateDialogForm
            open={openCreateDialog}
            onClose={handleCloseCreateDialog}
            clientCPF={clientCPF}
            onReload={onReload}
          />
        )}

        {openEditDialog && (
          <VehicleEditDialogForm
            open={openEditDialog}
            onClose={handleCloseEditDialog}
            licensePlate={selectedVehicle?.licensePlate || ''}
            vehicle={selectedVehicle}
            vehicleError={null}
            vehicleLoading={false}
            onReload={onReload}
          />
        )}
      </Card>
      <ConfirmDialog
        open={confirmDelete.value}
        onClose={confirmDelete.onFalse}
        title="Deletar Veículo"
        content="Você tem certeza que deseja deletar?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              if (selectedVehicle) {
                await deleteVehicle(selectedVehicle.licensePlate);
                onReload();
                confirmDelete.onFalse();
                enqueueSnackbar('Veículo deletado com sucesso!', { variant: 'success' });
              }
            }}
          >
            Deletar
          </Button>
        }
      />
    </>
  );
}
