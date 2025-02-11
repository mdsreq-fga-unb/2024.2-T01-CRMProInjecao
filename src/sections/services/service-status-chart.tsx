import { useTheme } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import Chart, { useChart } from '@/components/chart';
import { useGetServiceStats } from '@/api/service-stats';
import { ApexOptions } from 'apexcharts';

interface Props {
  title?: string;
  subheader?: string;
  chart?: boolean;
}

export default function ServiceStatusChart({ title, subheader, chart = true, ...other }: Props) {
  const theme = useTheme();
  const { stats, loading, error } = useGetServiceStats();
  
  const chartOptions = useChart({
    colors: [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ],
    chart: {
      stacked: true,
    },
    xaxis: {
      categories: ['Pendentes/Em Andamento', 'Aceitos/Concluídos', 'Cancelados'],
    },
    tooltip: {
      y: {
        formatter: (value: number) => value.toString(),
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        horizontal: false,
      },
    },
  });

  if (loading) return <Card sx={{ p: 3 }}><Typography>Carregando...</Typography></Card>;
  if (error) return <Card sx={{ p: 3 }}><Typography>Erro ao carregar dados</Typography></Card>;
  if (!chart) return null;

  const chartData = [
    {
      label: 'Orçamentos',
      data: [
        { label: 'Pendentes', value: stats?.pendingBudgets || 0 },
        { label: 'Aceitos', value: stats?.acceptedBudgets || 0 },
        { label: 'Cancelados', value: stats?.canceledBudgets || 0 },
      ],
    },
    {
      label: 'Ordens de Serviço',
      data: [
        { label: 'Em Andamento', value: stats?.activeOrders || 0 },
        { label: 'Concluídas', value: stats?.completedOrders || 0 },
        { label: 'Canceladas', value: stats?.canceledOrders || 0 },
      ],
    },
  ];

  return (
    <Card sx={{ p: 3 }} {...other}>
      {title && (
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}
      
      {subheader && (
        <Typography variant="body2" sx={{ mb: 3 }} color="text.secondary">
          {subheader}
        </Typography>
      )}

      <Chart
        type="bar"
        series={chartData.map((item) => ({
          name: item.label,
          data: item.data.map((d) => d.value),
        }))}
        options={chartOptions as ApexOptions}
        height={320}
      />
    </Card>
  );
} 