'use client';

// auth
import { RoleBasedGuard } from '@/auth/guard';
// components
import DashboardLayout from '@/layouts/dashboard';

// ----------------------------------------------------------------------
import { pt } from 'yup-locales';
import { setLocale } from 'yup';

setLocale(pt);

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <RoleBasedGuard roles={["adm"]}>
      <DashboardLayout>{children}</DashboardLayout>
    </RoleBasedGuard>
  );
}
