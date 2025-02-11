import { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';
import { Select } from '@mui/material';
import { BudgetStatus } from '@/types/budget';

type Props = {
  filters: {
    name: string;
    status: BudgetStatus | 'all';
  };
  onFilters: (name: string, value: any) => void;
};

export default function BudgetTableToolbar({ filters, onFilters }: Props) {
  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );

  const handleFilterStatus = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('status', event.target.value);
    },
    [onFilters]
  );

  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <TextField
        fullWidth
        value={filters.name}
        onChange={handleFilterName}
        placeholder="Buscar..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      <Select
        native
        value={filters.status}
        onChange={handleFilterStatus as any}
        sx={{ width: { xs: 1, md: 200 } }}
      >
        <option value="all">Todos Status</option>
        <option value={BudgetStatus.PENDING}>Pendente</option>
        <option value={BudgetStatus.ACCEPTED}>Aceito</option>
        <option value={BudgetStatus.CANCELED}>Cancelado</option>
      </Select>
    </Stack>
  );
} 