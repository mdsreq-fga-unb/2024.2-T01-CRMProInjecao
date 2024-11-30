'use client';

// components
import DashboardLayout from '@/layouts/dashboard';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <DashboardLayout>{children}</DashboardLayout>
  );
}
