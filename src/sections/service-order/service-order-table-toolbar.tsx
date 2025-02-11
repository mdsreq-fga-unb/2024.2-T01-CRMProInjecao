import { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';
import { Select } from '@mui/material';

type Props = {
  filters: {
    name: string;
    budgetStatus: 'all' | 'linked' | 'unlinked';
  };
  onFilters: (name: string, value: any) => void;
};

export default function ServiceOrderTableToolbar({ filters, onFilters }: Props) {
  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );

  const handleFilterBudgetStatus = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('budgetStatus', event.target.value);
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
        placeholder="Buscar por cliente ou descrição..."
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
        value={filters.budgetStatus}
        onChange={handleFilterBudgetStatus as any}
        sx={{ width: { xs: 1, md: 240 } }}
      >
        <option value="all">Todas as Ordens</option>
        <option value="linked">Vinculadas a Orçamento</option>
        <option value="unlinked">Sem Orçamento</option>
      </Select>
    </Stack>
  );
} 