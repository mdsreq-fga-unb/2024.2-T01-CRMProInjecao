import { useMemo } from 'react';
// components
import SvgColor from '@/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  qrcode: icon('ic_qrcode'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  cardapio: icon('ic_cardapio'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  config: icon('ic_config'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export type NavProps = {};

export function useNavData() {
  const navData: any = useMemo(
    () => [
      {
        subheader: 'app',
        items: [
          {
            title: 'dashboard',
            path: '/dashboard',
            icon: ICONS.dashboard,
          },
          {
            title: 'Clientes',
            path: '/dashboard/clients',
            icon: ICONS.user,
          },
          {
            title: 'Administradores',
            path: '/dashboard/users',
            icon: ICONS.user,
          },
          {
            title: 'Serviços',
            path: '/dashboard/services',
            icon: ICONS.order,
            children: [
              {
                title: 'Visão Geral',
                path: '/dashboard/services/overview',
              },
              {
                title: 'Orçamentos',
                path: '/dashboard/services/budgets',
              },
              {
                title: 'Ordens de Serviço',
                path: '/dashboard/services/orders',
              },
            ],
          },
          {
            title: 'Feedbacks',
            path: '/dashboard/feedbacks',
            icon: ICONS.file,
          },
          {
            title: 'Produtos',
            path: '/dashboard/products',
            icon: ICONS.product,
          },
        ],
      },
    ],
    []
  );

  return useMemo(() => navData, [navData]);
}
