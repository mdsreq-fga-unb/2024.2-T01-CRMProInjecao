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
import { IBudget, BudgetStatus } from 'src/types/budget';
import { deleteBudget, updateBudget, useGetBudgets } from 'src/api/budget';
import { useSnackbar } from 'notistack';
import { CardHeader, Dialog, Divider, TableContainer, Typography } from '@mui/material';
import BudgetTableRow from '../budget-table-row';
import BudgetTableToolbar from '../budget-table-toolbar';
import BudgetTableFiltersResult from '../budget-table-filters-result';
import BudgetNewEditForm from '../budget-new-edit-form';

const TABLE_HEAD = [
  { id: 'name', label: 'Nome' },
  { id: 'description', label: 'Descrição' },
  { id: 'client', label: 'Cliente' },
  { id: 'vehicle', label: 'Veículo' },
  { id: 'totalCost', label: 'Valor Total' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'Data' },
  { id: 'actions', label: 'Ações', align: 'right' },
];

const defaultFilters = {
  name: '',
  status: 'all' as BudgetStatus | 'all',
};

export default function BudgetListView() {
  const table = useTable();
  const settings = useSettingsContext();
  const router = useRouter();
  const budgetNewEdit = useBoolean();
  const { budgets, budgetsLoading } = useGetBudgets();
  const [currBudget, setCurrBudget] = useState<IBudget | null>(null);
  const [tableData, setTableData] = useState<IBudget[]>(budgets || []);
  const { enqueueSnackbar } = useSnackbar();
  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !!filters.name || filters.status !== 'all';
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDelete = useCallback(
    async (currentBudget: IBudget) => {
      try {
        await deleteBudget(currentBudget.id);
        enqueueSnackbar('Orçamento deletado com sucesso', { variant: 'success' });
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Erro ao deletar orçamento', { variant: 'error' });
      }
    },
    [enqueueSnackbar]
  );

  const handleAcceptBudget = useCallback(
    async (currentBudget: IBudget) => {
      try {
        await updateBudget(currentBudget.id, { status: BudgetStatus.ACCEPTED });
        enqueueSnackbar('Orçamento aceito com sucesso', { variant: 'success' });
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Erro ao aceitar orçamento', { variant: 'error' });
      }
    },
    [enqueueSnackbar]
  );

  const handleCancelBudget = useCallback(
    async (currentBudget: IBudget) => {
      try {
        await updateBudget(currentBudget.id, { status: BudgetStatus.CANCELED });
        enqueueSnackbar('Orçamento cancelado com sucesso', { variant: 'success' });
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Erro ao cancelar orçamento', { variant: 'error' });
      }
    },
    [enqueueSnackbar]
  );

  const handleEditRow = useCallback(
    (row: IBudget) => {
      setCurrBudget(row);
      budgetNewEdit.onTrue();
    },
    [budgetNewEdit]
  );

  const handleFilters = useCallback(
    (name: string, value: any) => {
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
    setTableData(budgets || []);
  }, [budgets, budgetsLoading]);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Lista"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Orçamentos', href: paths.dashboard.budgets },
          ]}
          action={
            <Button
              onClick={() => {
                setCurrBudget(null);
                budgetNewEdit.onTrue();
              }}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Novo Orçamento
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          <BudgetTableToolbar
            filters={filters}
            onFilters={handleFilters}
          />

          {canReset && (
            <BudgetTableFiltersResult
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
                      <BudgetTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => router.push(paths.dashboard.services.viewBudget(row.id))}
                        onDeleteRow={() => handleDelete(row)}
                        onEditRow={() => handleEditRow(row)}
                        onAcceptBudget={() => handleAcceptBudget(row)}
                        onCancelBudget={() => handleCancelBudget(row)}
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
        open={budgetNewEdit.value}
        onClose={() => {
          setCurrBudget(null);
          budgetNewEdit.onFalse();
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
                {currBudget ? 'Editar Orçamento' : 'Novo Orçamento'}
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
          <BudgetNewEditForm
            currentBudget={currBudget}
            onClose={() => {
              setCurrBudget(null);
              budgetNewEdit.onFalse();
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
  inputData: IBudget[];
  comparator: (a: any, b: any) => number;
  filters: {
    name: string;
    status: BudgetStatus | 'all';
  };
}) {
  const { name, status } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (budget) =>
        budget.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        budget.client.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((budget) => budget.status === status);
  }

  return inputData;
} 