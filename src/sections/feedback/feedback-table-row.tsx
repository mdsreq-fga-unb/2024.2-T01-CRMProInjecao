import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { IFeedback } from 'src/types/feedback';
import { ConfirmDialog } from '@/components/custom-dialog';
import { Typography } from '@mui/material';
import { fDate } from '@/utils/format-time';

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: IFeedback;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function FeedbackTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { description, rating, client, createdAt, serviceOrders } = row;

  const confirm = useBoolean();
  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>
          <Typography variant="subtitle2">{client.name}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{description || 'Não há'}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{rating}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{serviceOrders?.length ?? 0}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{fDate(createdAt)}</Typography>
        </TableCell>

        <TableCell align="right">
          <Tooltip title="Edição rápida" placement="top" arrow>
            <IconButton color="default" onClick={onEditRow}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          {/* <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton> */}
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
        title="Deletar Feedback"
        content="Você tem certeza que deseja deletar?"
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