'use client';

import { SnackbarProvider } from '@/components/snackbar';
import AuthClassicLayout from '@/layouts/auth/classic';
import CompactLayout from '@/layouts/compact';
import { GuestGuard } from 'src/auth/guard';


type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <SnackbarProvider>
      <CompactLayout>
        <GuestGuard>{children}</GuestGuard>
      </CompactLayout>
    </SnackbarProvider>
  );
} 