'use client';

import { useState, useCallback, useEffect } from 'react';
// @mui
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// hooks
import { useSnackbar } from 'notistack';
// components
import {
  useTable,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  getComparator,
  emptyRows,
} from 'src/components/table';
import { useSettingsContext } from 'src/components/settings';
// sections
// api
import { deleteUser, useGetUsers } from 'src/api/user';
// types
import { IUser } from 'src/types/user';
import { useBoolean } from '@/hooks/use-boolean';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { paths } from '@/routes/paths';
import Iconify from '@/components/iconify';
import UserNewEditForm from '../user-new-edit-form';
import UserTableFiltersResult from '../user-table-filters-result';
import UserTableToolbar from '../user-table-toolbar';
import UserTableRow from '../user-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Nome' },
  { id: 'email', label: 'E-mail' },
  { id: 'role', label: 'Papel' },
  { id: 'isActive', label: 'Status' },
  { id: 'createdAt', label: 'Criado em' },
  { id: '' },
];

const defaultFilters = {
  name: '',
};

export default function UserListView() {
  const table = useTable();

  const { enqueueSnackbar } = useSnackbar();

  const { themeStretch } = useSettingsContext();

  const { users, usersLoading } = useGetUsers();
  const [tableData, setTableData] = useState<IUser[]>(users || []);

  const [filters, setFilters] = useState(defaultFilters);

  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const userNewEdit = useBoolean();

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !!filters.name;

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name: string, value: string) => {
      table.onResetPage();
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleDeleteRow = async (id: string) => {
    try {
      await deleteUser(id);
      enqueueSnackbar('Usuário deletado', { variant: 'success' });
      setTableData((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao deletar usuário', { variant: 'error' });
    }
  };

  const handleEditRow = (user: IUser) => {
    setCurrentUser(user);
    userNewEdit.onTrue();
  };

  useEffect(() => {
    setTableData(users || []);
  }, [users]);

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Lista"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Usuários Administrativs', href: paths.dashboard.users },
        ]}
        action={
          <Button
            onClick={() => {
              setCurrentUser(null);
              userNewEdit.onTrue();
            }}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Novo usuário
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Card>
        <UserTableToolbar filters={filters} onFilters={handleFilters} />

        {canReset && (
          <UserTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            //
            onResetFilters={handleResetFilters}
            //
            results={dataFiltered.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Table size="small">
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={dataFiltered.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
            />

            <TableBody>
              {dataFiltered.map((user) => (
                <UserTableRow
                  key={user.id}
                  row={user}
                  selected={table.selected.includes(user.id)}
                  onEditRow={() => handleEditRow(user)}
                  onSelectRow={() => console.log('Select', user.id)}
                  onDeleteRow={() => handleDeleteRow(user.id)}
                />
              ))}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
              />

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </TableContainer>

        <TablePaginationCustom
          count={dataFiltered.length}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </Card>

      <Dialog open={userNewEdit.value} onClose={userNewEdit.onFalse} fullWidth maxWidth="sm">
        <UserNewEditForm currentUser={currentUser} onClose={userNewEdit.onFalse} />
      </Dialog>
    </Container>
  );
}

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: IUser[];
  comparator: (a: any, b: any) => number;
  filters: {
    name: string;
  };
}) {
  const { name } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  return inputData;
}
