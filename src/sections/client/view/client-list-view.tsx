'use client';

import { useState, useCallback, useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';
// types
//
import { IClient } from 'src/types/client';
import { deleteClient, useGetClients } from 'src/api/client';
import { useSnackbar } from 'notistack';
import { CardHeader, Dialog, Divider, Typography } from '@mui/material';
import ClientTableRow from '../client-table-row';
import ClientTableToolbar from '../client-table-toolbar';
import ClientTableFiltersResult from '../client-table-filters-result';
import ClientNewEditForm from '../client-new-edit-form';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'Todos' }];

const TABLE_HEAD = [
  { id: 'name', label: 'Nome' },
  { id: 'email', label: 'Email' },
  { id: 'vehicles', label: 'Qtd de Veículos' },
  { id: 'createdAt', label: 'Data de criação' },
  { id: 'actions', label: 'Ações', alignRight: true },
];

const defaultFilters: {
  name: string;
} = {
  name: '',
};

// ----------------------------------------------------------------------

export default function ClientListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const clientNewEdit = useBoolean();
  const { clients, clientsLoading, } = useGetClients();
  const [currClient, setCurrClient] = useState<IClient | null>(null);
  const [tableData, setTableData] = useState<IClient[]>(
    clients as IClient[] || []
  );

  const [filters, setFilters] = useState(defaultFilters);
  const { enqueueSnackbar } = useSnackbar();

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !!filters.name

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name: string, value: string) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleDelete = useCallback(async (currentClient: IClient) => {
    try {
      if (!currentClient) return;
      await deleteClient(currentClient.cpf);
      enqueueSnackbar('Cliente deletado com sucesso', { variant: 'success' });
      router.push(paths.dashboard.clients);
    } catch (error) {
      enqueueSnackbar('Erro ao deletar cliente', { variant: 'error' });
      console.error(error);
    }
  }, [router, enqueueSnackbar]);


  const handleEditRow = useCallback(
    (row: IClient) => {
      setCurrClient(row);
      clientNewEdit.onTrue();
    },
    [clientNewEdit]
  );

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);


  useEffect(() => {
    setTableData(clients as IClient[] || []);
    if (currClient && currClient.cpf) {
      if (typeof clients === typeof []) {
        const tempOrganization = clients.find((client) => client.cpf === currClient.cpf);
        setCurrClient(tempOrganization as IClient);
      }
    }
  }
    , [clients, currClient, clientsLoading]);
  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Lista"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Clientes', href: paths.dashboard.clients },
          ]}
          action={
            <Button
              onClick={
                () => {
                  setCurrClient(null);
                  clientNewEdit.onTrue();
                }
              }
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Novo Cliente
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          <Tabs
            value="all"
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant="filled"
                    color="success"
                  >
                    {tab.value === 'all' && clients?.length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <ClientTableToolbar
            filters={filters}
            onFilters={handleFilters}
          //
          />

          {canReset && (
            <ClientTableFiltersResult
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

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <ClientTableRow
                        key={(`${row.cpf}`)}
                        row={row}
                        selected={table.selected.includes((`${(`${row.cpf}`)}`))}
                        onSelectRow={() => table.onSelectRow((`${row.cpf}`))}
                        onDeleteRow={() => handleDelete((row))}
                        onEditRow={() => handleEditRow(row)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      <Dialog open={clientNewEdit.value} onClose={
        () => {
          setCurrClient(null);
          clientNewEdit.onFalse();
        }
      } fullWidth maxWidth="md" >
        <Card sx={{
          p: 3.5,
          overflowY: 'auto',
        }}>
          <CardHeader sx={{
            pb: 1,
            position: 'relative',
          }} title={
            <Typography variant="h5">
              {
                currClient ? 'Editar Cliente' : 'Novo Cliente'
              }
            </Typography>
          } />
          <Divider
            sx={{
              height: 2,
              mb: 2,
              zIndex: 99,
            }}
          />
          {
            currClient && currClient.cpf ? (
              <ClientNewEditForm
                currentClient={currClient}
                onClose={
                  () => {
                    setCurrClient(null);
                    clientNewEdit.onFalse();
                  }
                }
              />
            ) : (
              <ClientNewEditForm
                onClose={
                  () => {
                    setCurrClient(null);
                    clientNewEdit.onFalse();
                  }
                }
              />
            )
          }

          <IconButton onClick={() => {
            setCurrClient(null);
            clientNewEdit.onFalse();
          }
          }
            sx={{ position: 'absolute', top: 10, right: 25, zIndex: 99 }}>
            <Iconify icon="iconamoon:close" color="error.main" width={30} />
          </IconButton>
        </Card>
      </Dialog>

    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: IClient[];
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
