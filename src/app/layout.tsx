import 'simplebar-react/dist/simplebar.min.css';
import type { Metadata } from "next";
import ThemeProvider from '@/theme';
import { primaryFont } from '@/theme/typography';
import { SettingsDrawer, SettingsProvider } from '@/components/settings';

export const metadata: Metadata = {
  title: "CRM - Pro Injecao",
  description: "",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pt" className={primaryFont.className}>
      <body suppressHydrationWarning>
        <SettingsProvider
          defaultSettings={{
            themeMode: 'light', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
          }}
        >

          <ThemeProvider>
            <SettingsDrawer />
            {children}
          </ThemeProvider>

        </SettingsProvider>

      </body>
    </html >
  );
}
