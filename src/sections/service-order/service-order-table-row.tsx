import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { IServiceOrder } from 'src/types/service-order';
import { ConfirmDialog } from '@/components/custom-dialog';
import { Typography } from '@mui/material';
import { fDateTime } from '@/utils/format-time';
import { fCurrency } from '@/utils/format-number';

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: IServiceOrder;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function ServiceOrderTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { type, description, client, vehicle, additionalCost, createdAt } = row;

  const confirm = useBoolean();
  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>
          <Typography variant="subtitle2">{type.name}</Typography>
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
          <Typography variant="subtitle2">{fCurrency(additionalCost)}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{fDateTime(createdAt)}</Typography>
        </TableCell>

        <TableCell align="right">
          <Tooltip title="Edição rápida" placement="top" arrow>
            <IconButton color="default" onClick={onEditRow}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onSelectRow();
            popover.onClose();
            confirm.onTrue();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Deletar
        </MenuItem>
      </CustomPopover>

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