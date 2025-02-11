import { Stack, Typography, Card, Tooltip } from '@mui/material';
import { useGetRecentServices } from '@/api/service-stats';
import { fDateTime } from '@/utils/format-time';
import { fCurrency } from '@/utils/format-number';
import Label from '@/components/label';
import { BudgetStatus } from '@/types/budget';
import { ServiceOrderStatus } from '@/types/service-order';
import Scrollbar from '@/components/scrollbar';
import { useRouter } from '@/routes/hooks';
import { paths } from '@/routes/paths';
import Iconify from '@/components/iconify';

type RecentService = {
  id: string;
  type: 'budget' | 'service_order';
  title: string;
  status: string;
  clientName: string;
  createdAt: Date;
  totalValue: number;
  budgetId?: string;
  serviceOrderId?: string;
};

export default function RecentServices() {
  const { recentServices, loading } = useGetRecentServices();
  const router = useRouter();

  if (loading) return null;

  const handleServiceClick = (service: RecentService) => {
    if (service.type === 'budget') {
      router.push(paths.dashboard.services.viewBudget(service.budgetId!));
    } else {
      router.push(paths.dashboard.services.viewOrder(service.serviceOrderId!));
    }
  };

  const getStatusColor = (service: RecentService) => {
    if (service.type === 'budget') {
      switch (service.status) {
        case BudgetStatus.ACCEPTED:
          return 'success';
        case BudgetStatus.CANCELED:
          return 'error';
        default:
          return 'warning';
      }
    }

    switch (service.status) {
      case ServiceOrderStatus.COMPLETED:
        return 'success';
      case ServiceOrderStatus.CANCELED:
        return 'error';
      default:
        return 'warning';
    }
  };

  const getServiceIcon = (service: RecentService) => {
    if (service.type === 'budget') {
      return 'eva:file-text-fill';
    }
    return 'eva:settings-2-fill';
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Serviços Recentes
      </Typography>

      <Scrollbar sx={{ maxHeight: 400 }}>
        <Stack spacing={2}>
          {recentServices?.map((service : any) => (
            <Tooltip 
              key={service.id}
              title={service.serviceOrderId && service.type === 'budget' ? 'Orçamento com Ordem de Serviço vinculada' : ''}
            >
              <Card
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'background.neutral' },
                }}
                onClick={() => handleServiceClick(service)}
              >
                <Stack spacing={1}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon={getServiceIcon(service)} width={20} />
                    <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                      {service.title}
                    </Typography>
                    <Label
                      variant="soft"
                      color={getStatusColor(service)}
                    >
                      {service.status}
                    </Label>
                  </Stack>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {service.clientName}
                  </Typography>

                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      {fDateTime(service.createdAt)}
                    </Typography>
                    <Typography variant="subtitle2">
                      {fCurrency(service.totalValue)}
                    </Typography>
                  </Stack>

                  {service.serviceOrderId && service.type === 'budget' && (
                    <Typography variant="caption" sx={{ color: 'info.main' }}>
                      <Iconify icon="eva:link-fill" width={16} sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                      Ordem de Serviço vinculada
                    </Typography>
                  )}
                </Stack>
              </Card>
            </Tooltip>
          ))}
        </Stack>
      </Scrollbar>
    </>
  );
} 