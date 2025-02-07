// @mui
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { IUser, UserRole } from 'src/types/user';
import { ConfirmDialog } from '@/components/custom-dialog';
import { Typography } from '@mui/material';
import { fDate } from '@/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: IUser;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { name, email, role, isActive, createdAt } = row;

  const confirm = useBoolean();
  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>

        <TableCell>
          <Typography variant="subtitle2">{name ?? "Sem nome definido"}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{email}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{
            role === UserRole.ADMIN ? 'Administrador' : 'Usuário'
          }</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{isActive ? 'Ativo' : 'Inativo'}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{fDate(createdAt)}</Typography>
        </TableCell>

        <TableCell align="right">
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            onEditRow();
          }}
        >
          <Iconify icon="eva:edit-fill" /> Editar
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            confirm.onTrue();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" /> Deletar
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={<>
          Você tem certeza que deseja excluir o usuário <strong>{name}</strong>?
        </>}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Deletar
          </Button>
        }
      />
    </>
  );
}
