'use client';

import { useCallback, useState } from 'react';
import { Container, Tab, Tabs } from '@mui/material';
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { paths } from '@/routes/paths';
import { useGetServiceOrderDetails } from '@/api/service-order';
import { LoadingScreen } from '@/components/loading-screen';
import ServiceHistoryTimeline from '@/components/service-history/service-history-timeline';
import { useGetServiceHistoryByServiceOrder } from '@/api/service-history';
import Iconify from '@/components/iconify';
import { useRouter } from 'next/navigation';
import ServiceOrderNewEditForm from '../service-order-new-edit-form';

export default function ServiceOrderDetailsView({ serviceOrderId }: { serviceOrderId: string }) {
  const settings = useSettingsContext();
  const { serviceOrder, loading: orderLoading } = useGetServiceOrderDetails(serviceOrderId);
  const { serviceHistory } = useGetServiceHistoryByServiceOrder(serviceOrderId);
  const [currentTab, setCurrentTab] = useState('details');
  const router = useRouter();
  const TABS = [
    {
      value: 'details',
      label: 'Detalhes',
      icon: <Iconify icon="solar:file-text-bold" width={24} />,
    },
    {
      value: 'history',
      label: 'Histórico',
      icon: <Iconify icon="solar:clock-circle-bold" width={24} />,
    },
  ];

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  if (orderLoading) {
    return <LoadingScreen />;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Detalhes da Ordem de Serviço"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Serviços', href: paths.dashboard.services.root },
          { name: 'Ordens de Serviço', href: paths.dashboard.services.orders },
          { name: serviceOrder?.type?.name || 'Detalhes' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            icon={tab.icon}
            value={tab.value}
            iconPosition="start"
          />
        ))}
      </Tabs>

      {currentTab === 'details' && serviceOrder && (
        <ServiceOrderNewEditForm
          currentServiceOrder={serviceOrder}
          onClose={() => {
            router.push(paths.dashboard.services.orders);
          }}
        />
      )}

      {currentTab === 'history' && serviceHistory && (
        <ServiceHistoryTimeline history={serviceHistory} />
      )}
    </Container>
  );
} 