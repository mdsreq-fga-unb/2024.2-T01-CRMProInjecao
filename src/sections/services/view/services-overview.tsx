'use client';

import { useState } from 'react';
import { Container, Typography, Card, Grid, Button, Stack, Box } from '@mui/material';
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import Iconify from '@/components/iconify';
import { paths } from '@/routes/paths';
import { useRouter } from '@/routes/hooks';
import ServiceCreateDialog from '../service-create-dialog';
import ServiceStats from '../service-stats';
import RecentServices from '../recent-services';
import ServiceStatusChart from '../service-status-chart';

export default function ServicesOverviewView() {
  const settings = useSettingsContext();
  const router = useRouter();
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Serviços"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Serviços', href: paths.dashboard.services.root },
          { name: 'Visão Geral' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setOpenCreate(true)}
          >
            Novo Serviço
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Grid container spacing={3}>
        {/* Cards de Estatísticas */}
        <Grid item xs={12}>
          <ServiceStats />
        </Grid>

        {/* Gráfico de Status */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <ServiceStatusChart title='Status dos Serviços' />
          </Card>
        </Grid>

        {/* Serviços Recentes */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: '100%' }}>
            <RecentServices />
          </Card>
        </Grid>

        {/* Links Rápidos */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Ações Rápidas
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="eva:file-text-fill" />}
                onClick={() => router.push(paths.dashboard.services.budgets)}
              >
                Ver Orçamentos
              </Button>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="eva:settings-2-fill" />}
                onClick={() => router.push(paths.dashboard.services.orders)}
              >
                Ver Ordens de Serviço
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog de Criação de Serviço */}
      <ServiceCreateDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />
    </Container>
  );
} 