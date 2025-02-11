'use client';

import { Container } from '@mui/material';
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { paths } from '@/routes/paths';
import { useRouter } from 'src/routes/hooks';
import ServiceOrderNewEditForm from '../service-order-new-edit-form';

export default function ServiceOrderCreateView() {
  const router = useRouter();
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Criar Ordem de Serviço"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Serviços', href: paths.dashboard.services.root },
          { name: 'Ordens de Serviço', href: paths.dashboard.services.orders },
          { name: 'Nova Ordem' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ServiceOrderNewEditForm
        onClose={() => {
          router.push(paths.dashboard.services.orders);
        }}
      />
    </Container>
  );
} 