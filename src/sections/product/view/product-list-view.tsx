'use client';

import { useGetCategories } from '@/api/category';
import { useGetProductsByFilter } from '@/api/product';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useSettingsContext } from '@/components/settings';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  useTable,
  getComparator,
  emptyRows,
  TablePaginationCustom,
} from '@/components/table';
import { useBoolean } from '@/hooks/use-boolean';
import { paths } from '@/routes/paths';
import { ICategory } from '@/types/category';
import { IProduct } from '@/types/product';
import {
  alpha,
  Button,
  Card,
  Container,
  Dialog,
  Tab,
  Table,
  TableBody,
  TableContainer,
  Tabs,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'src/routes/hooks';
import Label from '@/components/label';
import ProductTableToolbar from '../product-table-toolbar';
import ProductsTableFiltersResult from '../product-table-filters-result';
import ProductTableRow from '../product-table-row';
import ProductNewEditForm from '../product-new-edit-form';

type ProductCategory = {
  id: string | null;
  value: string;
  label: string;
};

const DEFAULT_FILTER = {
  name: '',
  categoryId: null,
};

const DEFAULT_CATEGORIES_OPTIONS: ProductCategory[] = [
  {
    id: null,
    value: '',
    label: 'Todos',
  },
];

const TABLE_HEAD = [
  { id: 'name', label: 'Nome' },
  { id: 'description', label: 'Descrição' },
  { id: 'brand', label: 'Marca' },
  { id: 'costValue', label: 'Valor de custo' },
  { id: 'sellValue', label: 'Valor de venda' },
  { id: 'createdAt', label: 'Criado em' },
  { id: 'actions', label: 'Ações', alignRight: true },
];

export default function ProductListView() {
  const table = useTable();

  const { themeStretch } = useSettingsContext();

  // ------- Categories -------
  const { categories, categoriesLoading } = useGetCategories();
  const [categoriesOptions, setCategoriesOptions] = useState<ProductCategory[]>([
    ...DEFAULT_CATEGORIES_OPTIONS,
    ...(categories?.map((category: ICategory) => ({
      id: category.id,
      value: category.name,
      label: category.name,
    })) || []),
  ]);

  // ------- Products -------
  const [filters, setFilters] = useState(DEFAULT_FILTER);
  const { products, productsLoading } = useGetProductsByFilter(filters.name, filters.categoryId);
  const [currProduct, setCurrProduct] = useState<IProduct | null>(null);
  const [tableData, setTableData] = useState<IProduct[]>((products as IProduct[]) || []);
  const productNewEdit = useBoolean();
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  // ------- Handlers -------
  const denseHeight = table.dense ? 52 : 72;

  const canReset = !!filters.name && !!filters.categoryId;

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

  const handleFilterStatus = useCallback(
    (newValue: string) => {
      handleFilters('categoryId', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTER);
  }, []);

  const handleEditRow = (product: IProduct) => {
    setCurrProduct(product);
    productNewEdit.onTrue();
  };

  useEffect(() => {
    if (!productsLoading) {
      setTableData(products || []);
    }
  }, [products, productsLoading]);

  useEffect(() => {
    if (!categoriesLoading) {
      setCategoriesOptions([
        ...DEFAULT_CATEGORIES_OPTIONS,
        ...(categories?.map((category: ICategory) => ({
          id: category.id,
          value: category.name,
          label: category.name,
        })) || []),
      ]);
    }
  }, [categories, categoriesLoading]);

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Lista"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Produtos', href: paths.dashboard.products },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Card>
        {!categoriesLoading && (
          <Tabs
            value={filters.categoryId || 'all'}
            onChange={(event, newValue) => {
              handleFilterStatus(newValue);
            }}
            sx={{
              px: 2.5,
              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {categoriesOptions.map((tab) => (
              <Tab key={tab.value} iconPosition="end" value={tab.id} label={tab.label} />
            ))}
          </Tabs>
        )}
        <ProductTableToolbar filters={filters} onFilters={handleFilters} />

        {canReset && (
          <ProductsTableFiltersResult
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
              {dataFiltered.map((product) => (
                <ProductTableRow
                  key={product.id}
                  row={product}
                  selected={table.selected.includes(product.id)}
                  onEditRow={() => handleEditRow(product)}
                  onSelectRow={() => console.log('Select', product.id)}
                  onDeleteRow={() => null}
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

      <Dialog open={productNewEdit.value} onClose={productNewEdit.onFalse} fullWidth maxWidth="sm">
        <ProductNewEditForm
          currentProduct={currProduct}
          categories={categories}
          onClose={productNewEdit.onFalse}
        />
      </Dialog>
    </Container>
  );
}

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: IProduct[];
  comparator: (a: any, b: any) => number;
  filters: {
    name: string;
    categoryId: string | null;
  };
}) {
  const { name, categoryId } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (product) => product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }
  if (categoryId) {
    inputData = inputData.filter((product) => product.categories.some((c) => c.id === categoryId));
  }

  return inputData;
}
