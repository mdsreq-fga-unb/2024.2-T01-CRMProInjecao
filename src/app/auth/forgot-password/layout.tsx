'use client';

import { SnackbarProvider } from '@/components/snackbar';
// components
import CompactLayout from '@/layouts/compact';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <SnackbarProvider>
      <CompactLayout>{children}</CompactLayout>
    </SnackbarProvider>
  );
}
