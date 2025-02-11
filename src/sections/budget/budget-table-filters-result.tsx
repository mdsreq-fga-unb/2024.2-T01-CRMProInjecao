import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';
import Iconify from 'src/components/iconify';
import { BudgetStatus } from '@/types/budget';

interface Props extends StackProps {
  filters: {
    name: string;
    status: BudgetStatus | 'all';
  };
  onFilters: (name: string, value: any) => void;
  onResetFilters: VoidFunction;
  results: number;
}

export default function BudgetTableFiltersResult({
  filters,
  onFilters,
  onResetFilters,
  results,
  ...other
}: Props) {
  const handleRemoveFilter = (key: string) => {
    onFilters(key, key === 'status' ? 'all' : '');
  };

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          resultados encontrados
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {filters.status !== 'all' && (
          <Block label="Status:">
            <Chip size="small" label={filters.status} onDelete={() => handleRemoveFilter('status')} />
          </Block>
        )}

        {filters.name && (
          <Block label="Busca:">
            <Chip size="small" label={filters.name} onDelete={() => handleRemoveFilter('name')} />
          </Block>
        )}

        <Button
          color="error"
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Limpar
        </Button>
      </Stack>
    </Stack>
  );
}

type BlockProps = {
  label: string;
  children: React.ReactNode;
};

function Block({ label, children }: BlockProps) {
  return (
    <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
      <Box component="span" sx={{ color: 'text.secondary' }}>
        {label}&nbsp;
      </Box>

      {children}
    </Stack>
  );
} 