import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { IBudget, BudgetStatus } from 'src/types/budget';
import { ConfirmDialog } from '@/components/custom-dialog';
import { Typography, Chip } from '@mui/material';
import { fDateTime } from '@/utils/format-time';
import { fCurrency } from '@/utils/format-number';

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: IBudget;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onAcceptBudget: VoidFunction;
  onCancelBudget: VoidFunction;
};

const getStatusColor = (status: BudgetStatus) => {
  switch (status) {
    case BudgetStatus.ACCEPTED:
      return 'success';
    case BudgetStatus.CANCELED:
      return 'error';
    default:
      return 'warning';
  }
};

const getStatusLabel = (status: BudgetStatus) => {
  switch (status) {
    case BudgetStatus.ACCEPTED:
      return 'Aceito';
    case BudgetStatus.CANCELED:
      return 'Cancelado';
    default:
      return 'Pendente';
  }
};

export default function BudgetTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onAcceptBudget,
  onCancelBudget,
}: Props) {
  const { name, description, client, vehicle, totalCost, status, createdAt } = row;

  const confirm = useBoolean();
  const popover = usePopover();

  const isPending = status === BudgetStatus.PENDING;

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>
          <Typography variant="subtitle2">{name}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{description}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{client.name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            CPF: {client.cpf}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{vehicle.model}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Placa: {vehicle.licensePlate}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{fCurrency(totalCost)}</Typography>
        </TableCell>

        <TableCell>
          <Chip
            label={getStatusLabel(status)}
            color={getStatusColor(status)}
            variant="outlined"
          />
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{fDateTime(createdAt)}</Typography>
        </TableCell>

        <TableCell align="right">
          {isPending && (
            <>
              <Tooltip title="Aceitar" placement="top" arrow>
                <IconButton color="success" onClick={onAcceptBudget}>
                  <Iconify icon="eva:checkmark-circle-2-fill" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Cancelar" placement="top" arrow>
                <IconButton color="error" onClick={onCancelBudget}>
                  <Iconify icon="eva:close-circle-fill" />
                </IconButton>
              </Tooltip>
            </>
          )}

          <Tooltip title="Edição rápida" placement="top" arrow>
            <IconButton color="default" onClick={onEditRow}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Detalhes" placement="top" arrow>
            <IconButton color='info' onClick={onSelectRow}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>


      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Deletar"
        content="Tem certeza que deseja deletar?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              confirm.onFalse();
            }}
          >
            Deletar
          </Button>
        }
      />
    </>
  );
} 