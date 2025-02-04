'use client';

import { SnackbarProvider } from 'src/components/snackbar';
// components
import CompactLayout from 'src/layouts/compact';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <SnackbarProvider>
      <CompactLayout>{children}</CompactLayout>
    </SnackbarProvider>
  )
}
