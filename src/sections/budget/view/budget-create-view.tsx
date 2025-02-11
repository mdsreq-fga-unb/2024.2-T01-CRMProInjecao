'use client';

import { Container } from '@mui/material';
import { useSettingsContext } from '@/components/settings';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { paths } from '@/routes/paths';
import BudgetNewEditForm from '../budget-new-edit-form';

export default function BudgetCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Criar Orçamento"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Serviços', href: paths.dashboard.services.root },
          { name: 'Orçamentos', href: paths.dashboard.services.budgets },
          { name: 'Novo Orçamento' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <BudgetNewEditForm />
    </Container>
  );
} 