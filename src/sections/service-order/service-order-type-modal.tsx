import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Stack,
  Typography,
  Card,
} from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { fCurrency } from '@/utils/format-number';
import { IServiceOrderType } from '@/types/service-order';
import { deleteServiceOrderType, useGetServiceOrderTypes } from '@/api/service-order';
import { ConfirmDialog } from '@/components/custom-dialog';
import Scrollbar from '@/components/scrollbar';
import ServiceOrderTypeNewEditForm from './service-order-type-new-edit-form';

type Props = {
  open: boolean;
  onClose: VoidFunction;
};

export default function ServiceOrderTypeModal({ open, onClose }: Props) {
  const { serviceOrderTypes } = useGetServiceOrderTypes();
  const [currentType, setCurrentType] = useState<IServiceOrderType | null>(null);
  const typeNewEdit = useBoolean();
  const confirm = useBoolean();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (type: IServiceOrderType) => {
    try {
      await deleteServiceOrderType(type.id);
      enqueueSnackbar('Tipo de ordem de serviço deletado com sucesso!', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao deletar tipo de ordem de serviço', { variant: 'error' });
    }
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Typography variant="h4">Tipos de Ordem de Serviço</Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => {
              setCurrentType(null);
              typeNewEdit.onTrue();
            }}
          >
            Novo Tipo
          </Button>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Preço Base</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {serviceOrderTypes?.map((type) => (
                    <TableRow key={type.id}>
                      <TableCell>{type.name}</TableCell>
                      <TableCell>{type.description}</TableCell>
                      <TableCell>{fCurrency(type.price)}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="default"
                          onClick={() => {
                            setCurrentType(type);
                            typeNewEdit.onTrue();
                          }}
                        >
                          <Iconify icon="solar:pen-bold" />
                        </IconButton>

                        <IconButton
                          color="error"
                          onClick={() => {
                            setCurrentType(type);
                            confirm.onTrue();
                          }}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </DialogContent>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={typeNewEdit.value}
        onClose={() => {
          setCurrentType(null);
          typeNewEdit.onFalse();
        }}
      >
        <DialogTitle>
          {currentType ? 'Editar Tipo de Ordem de Serviço' : 'Novo Tipo de Ordem de Serviço'}
        </DialogTitle>
        <DialogContent>
          <ServiceOrderTypeNewEditForm
            currentType={currentType}
            onClose={() => {
              setCurrentType(null);
              typeNewEdit.onFalse();
            }}
          />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Deletar"
        content="Tem certeza que deseja deletar este tipo de ordem de serviço?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              if (currentType) {
                handleDelete(currentType);
              }
              confirm.onFalse();
            }}
          >
            Deletar
          </Button>
        }
      />
    </Dialog>
  );
} 