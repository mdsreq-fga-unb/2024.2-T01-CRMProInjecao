import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import CustomPopover from 'src/components/custom-popover';
import { IServiceOrder , ServiceOrderStatus } from 'src/types/service-order';
import { ConfirmDialog } from '@/components/custom-dialog';
import { Typography, Stack, Link } from '@mui/material';
import { fDateTime } from '@/utils/format-time';
import { fCurrency } from '@/utils/format-number';
import { useState } from 'react';
import Label from '@/components/label';

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
  onSelectRow,
  onEditRow,
  onDeleteRow,
}: Props) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };



  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case ServiceOrderStatus.COMPLETED:
        return 'success';
      case ServiceOrderStatus.CANCELED:
        return 'error';
      default:
        return 'warning';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case ServiceOrderStatus.COMPLETED:
        return 'Concluída';
      case ServiceOrderStatus.CANCELED:
        return 'Cancelada';
      default:
        return 'Em Andamento';
    }
  };


  return (
    <>
      <TableRow hover selected={selected}>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <div>
              <Typography variant="subtitle2">{row.type.name}</Typography>
              {row.budget && (
                <Link
                  sx={{
                    color: 'text.secondary',
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Orçamento: {row.budget.name}
                </Link>
              )}
            </div>
          </Stack>
        </TableCell>

        <TableCell>{row.description}</TableCell>

        <TableCell>
          <Typography variant="subtitle2">{row.client.name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {row.client.cpf}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{row.vehicle.model}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {row.vehicle.licensePlate}
          </Typography>
        </TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={getStatusColor(row.status)}
          >
            {getStatusLabel(row.status)}
          </Label>
        </TableCell>

        <TableCell align="right">{
          fCurrency(parseFloat(String(row.type.price)) + parseFloat(String(row.additionalCost)))
        }</TableCell>

        <TableCell align="right">{fDateTime(row.createdAt)}</TableCell>

        <TableCell align="right">
          <Tooltip title="Editar" placement="top" arrow>
            <IconButton color='default' onClick={onEditRow}>
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

      <CustomPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
} 