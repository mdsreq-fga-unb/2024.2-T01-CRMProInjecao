'use client';

import { useCallback, useState } from 'react';
import { Container, Tab, Tabs } from '@mui/material';
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { paths } from '@/routes/paths';
import { useGetBudget , useGetBudgetDetails } from '@/api/budget';
import { LoadingScreen } from '@/components/loading-screen';
import ServiceHistoryTimeline from '@/components/service-history/service-history-timeline';
import { useGetServiceHistoryByBudget } from '@/api/service-history';
import Iconify from '@/components/iconify';
import BudgetNewEditForm from '../budget-new-edit-form';

export default function BudgetDetailsView({ budgetId }: { budgetId: string }) {
  const settings = useSettingsContext();
  const { budget, loading: budgetLoading } = useGetBudgetDetails(budgetId);
  const { serviceHistory, } = useGetServiceHistoryByBudget(budgetId);
  const [currentTab, setCurrentTab] = useState('details');

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

  if (budgetLoading) {
    return <LoadingScreen />;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Detalhes do Orçamento"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Serviços', href: paths.dashboard.services.root },
          { name: 'Orçamentos', href: paths.dashboard.services.budgets },
          { name: budget?.name || 'Detalhes' },
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

      {currentTab === 'details' && budget && (
        <BudgetNewEditForm
          currentBudget={budget}
          onClose={() => {}}
        />
      )}

      {currentTab === 'history' && serviceHistory && (
        <ServiceHistoryTimeline history={serviceHistory} />
      )}
    </Container>
  );
} 