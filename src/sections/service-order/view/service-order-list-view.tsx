'use client';

import { useState, useCallback, useEffect } from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
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
import { IServiceOrder } from 'src/types/service-order';
import { deleteServiceOrder, useGetServiceOrders } from 'src/api/service-order';
import { useSnackbar } from 'notistack';
import { CardHeader, Dialog, Divider, TableContainer, Typography } from '@mui/material';
import ServiceOrderTableRow from '../service-order-table-row';
import ServiceOrderNewEditForm from '../service-order-new-edit-form';
import ServiceOrderTableToolbar from '../service-order-table-toolbar';
import ServiceOrderTableFiltersResult from '../service-order-table-filters-result';

const TABLE_HEAD = [
  { id: 'type', label: 'Tipo / Orçamento' },
  { id: 'description', label: 'Descrição' },
  { id: 'client', label: 'Cliente' },
  { id: 'vehicle', label: 'Veículo' },
  { id: 'status', label: 'Status' },
  { id: 'totalValue', label: 'Valor Total' },
  { id: 'createdAt', label: 'Data' },
  { id: 'actions', label: 'Ações', align: 'right' },
];

const defaultFilters = {
  name: '',
  budgetStatus: 'all' as const,
};

export default function ServiceOrderListView() {
  const table = useTable();
  const settings = useSettingsContext();
  const router = useRouter();
  const serviceOrderNewEdit = useBoolean();
  const { serviceOrders, serviceOrdersLoading } = useGetServiceOrders();
  const [currServiceOrder, setCurrServiceOrder] = useState<IServiceOrder | null>(null);
  const [tableData, setTableData] = useState<IServiceOrder[]>(serviceOrders || []);
  const { enqueueSnackbar } = useSnackbar();
  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !!filters.name;
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDelete = useCallback(
    async (currentServiceOrder: IServiceOrder) => {
      try {
        await deleteServiceOrder(currentServiceOrder.id);
        enqueueSnackbar('Ordem de serviço deletada com sucesso', { variant: 'success' });
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Erro ao deletar ordem de serviço', { variant: 'error' });
      }
    },
    [enqueueSnackbar]
  );

  const handleEditRow = useCallback(
    (row: IServiceOrder) => {
      setCurrServiceOrder(row);
      serviceOrderNewEdit.onTrue();
    },
    [serviceOrderNewEdit]
  );

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

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  useEffect(() => {
    setTableData(serviceOrders || []);
  }, [serviceOrders, serviceOrdersLoading]);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Lista"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Ordens de Serviço', href: paths.dashboard.serviceOrders },
          ]}
          action={
            <Button
              onClick={() => {
                setCurrServiceOrder(null);
                serviceOrderNewEdit.onTrue();
              }}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Nova Ordem de Serviço
            </Button>
          }
        />

        <Card>
          <ServiceOrderTableToolbar
            filters={filters}
            onFilters={handleFilters}
          />

          {canReset && (
            <ServiceOrderTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              onResetFilters={handleResetFilters}
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
                      <ServiceOrderTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => router.push(paths.dashboard.services.viewOrder(row.id))}
                        onDeleteRow={() => handleDelete(row)}
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
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      <Dialog
        open={serviceOrderNewEdit.value}
        onClose={() => {
          setCurrServiceOrder(null);
          serviceOrderNewEdit.onFalse();
        }}
        fullWidth
        maxWidth="md"
      >
        <Card
          sx={{
            p: 3.5,
            overflowY: 'auto',
          }}
        >
          <CardHeader
            sx={{
              pb: 1,
              position: 'relative',
            }}
            title={
              <Typography variant="h5">
                {currServiceOrder ? 'Editar Ordem de Serviço' : 'Nova Ordem de Serviço'}
              </Typography>
            }
          />
          <Divider
            sx={{
              height: 2,
              mb: 2,
              zIndex: 99,
            }}
          />
          <ServiceOrderNewEditForm
            currentServiceOrder={currServiceOrder}
            onClose={() => {
              setCurrServiceOrder(null);
              serviceOrderNewEdit.onFalse();
            }}
          />
        </Card>
      </Dialog>
    </>
  );
}

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: IServiceOrder[];
  comparator: (a: any, b: any) => number;
  filters: {
    name: string;
    budgetStatus: 'all' | 'linked' | 'unlinked';
  };
}) {
  const { name, budgetStatus } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (serviceOrder) =>
        serviceOrder.client.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        serviceOrder.description.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (budgetStatus !== 'all') {
    inputData = inputData.filter((serviceOrder) => {
      if (budgetStatus === 'linked') {
        return !!serviceOrder.budget;
      }
      return !serviceOrder.budget;
    });
  }

  return inputData;
}