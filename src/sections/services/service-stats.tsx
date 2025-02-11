import { Grid, Card, Typography, Stack } from '@mui/material';
import Iconify from '@/components/iconify';
import { fCurrency } from '@/utils/format-number';
import { useGetServiceStats } from '@/api/service-stats';

export default function ServiceStats() {
  const { stats, loading } = useGetServiceStats();

  if (loading) return null;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <div>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Orçamentos Pendentes
              </Typography>
              <Typography variant="h3">{stats?.pendingBudgets || 0}</Typography>
            </div>
            <Iconify icon="eva:file-text-fill" width={48} sx={{ color: 'primary.main' }} />
          </Stack>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <div>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Ordens em Andamento
              </Typography>
              <Typography variant="h3">{stats?.activeOrders || 0}</Typography>
            </div>
            <Iconify icon="eva:settings-2-fill" width={48} sx={{ color: 'info.main' }} />
          </Stack>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <div>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Ticket Médio
              </Typography>
              <Typography variant="h3">{fCurrency(stats?.averageTicket || 0)}</Typography>
            </div>
            <Iconify icon="eva:trending-up-fill" width={48} sx={{ color: 'success.main' }} />
          </Stack>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <div>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Taxa de Conversão
              </Typography>
              <Typography variant="h3">{stats?.conversionRate.toFixed(1)}%</Typography>
            </div>
            <Iconify icon="eva:percent-fill" width={48} sx={{ color: 'warning.main' }} />
          </Stack>
        </Card>
      </Grid>

      {/* Adicione mais cards de estatísticas conforme necessário */}
    </Grid>
  );
} 