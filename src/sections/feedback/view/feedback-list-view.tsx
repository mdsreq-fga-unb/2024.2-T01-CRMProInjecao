'use client';

import { useState, useCallback, useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
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
import { IFeedback } from 'src/types/feedback';
import { deleteFeedback, useGetFeedbacks } from 'src/api/feedback';
import { useSnackbar } from 'notistack';
import { CardHeader, Dialog, Divider, TableContainer, Typography } from '@mui/material';
import FeedbackTableRow from '../feedback-table-row';
import FeedbackNewEditForm from '../feedback-new-edit-form';
import FeedbackTableToolbar from '../feedback-table-toolbar';
import FeedbackTableFiltersResult from '../feedback-table-filters-result';

const STATUS_OPTIONS = [{ value: 'all', label: 'Todos' }];

const TABLE_HEAD = [
  { id: 'client', label: 'Cliente' },
  { id: 'description', label: 'Descrição' },
  { id: 'rating', label: 'Avaliação' },
  { id: 'serviceOrders', label: 'Ordens de Serviço' },
  { id: 'createdAt', label: 'Data' },
  { id: 'actions', label: 'Ações', align: 'right' },
];

const defaultFilters = {
  name: '',
};

export default function FeedbackListView() {
  const table = useTable();
  const settings = useSettingsContext();
  const router = useRouter();
  const feedbackNewEdit = useBoolean();
  const { feedbacks, feedbacksLoading } = useGetFeedbacks();
  const [currFeedback, setCurrFeedback] = useState<IFeedback | null>(null);
  const [tableData, setTableData] = useState<IFeedback[]>(feedbacks || []);
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
    async (currentFeedback: IFeedback) => {
      try {
        await deleteFeedback(currentFeedback.id);
        enqueueSnackbar('Feedback deletado com sucesso', { variant: 'success' });
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Erro ao deletar feedback', { variant: 'error' });
      }
    },
    [enqueueSnackbar]
  );

  const handleEditRow = useCallback(
    (row: IFeedback) => {
      setCurrFeedback(row);
      feedbackNewEdit.onTrue();
    },
    [feedbackNewEdit]
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
    setTableData(feedbacks || []);
  }, [feedbacks, feedbacksLoading]);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Lista"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Feedbacks', href: paths.dashboard.feedbacks },
          ]}
          action={
            <Button
              onClick={() => {
                setCurrFeedback(null);
                feedbackNewEdit.onTrue();
              }}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Novo Feedback
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          <Tabs
            value="all"
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
                  <Label variant="filled" color="success">
                    {tab.value === 'all' && feedbacks?.length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <FeedbackTableToolbar
            filters={filters}
            onFilters={handleFilters}
          />

          {canReset && (
            <FeedbackTableFiltersResult
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
                      <FeedbackTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id.toString())}
                        onSelectRow={() => table.onSelectRow(row.id.toString())}
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
        open={feedbackNewEdit.value}
        onClose={() => {
          setCurrFeedback(null);
          feedbackNewEdit.onFalse();
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
                {currFeedback ? 'Editar Feedback' : 'Novo Feedback'}
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
          <FeedbackNewEditForm
            currentFeedback={currFeedback}
            onClose={() => {
              setCurrFeedback(null);
              feedbackNewEdit.onFalse();
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
  inputData: IFeedback[];
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
      (feedback) => feedback.client.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  return inputData;
} 