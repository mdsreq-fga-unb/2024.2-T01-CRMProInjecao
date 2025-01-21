'use client';

// auth
import { AuthGuard } from '@/auth/guard';
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
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
