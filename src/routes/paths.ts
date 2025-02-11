// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/login`,
      register: `${ROOTS.AUTH}/register`,
      verify: `${ROOTS.AUTH}/verify`,
      forgotPassword: `${ROOTS.AUTH}/forgot-password`,
      resetPassword: (token: string) => `${ROOTS.AUTH}/new-password/${token}`,
    },
  },
  dashboard: {
    root: '/dashboard',
    users: `${ROOTS.DASHBOARD}/users`,
    clients: `${ROOTS.DASHBOARD}/clients`,
    serviceOrders: `${ROOTS.DASHBOARD}/service-orders`,
    products: `${ROOTS.DASHBOARD}/products`,
    inventory: `${ROOTS.DASHBOARD}/inventory`,
    ratings: `${ROOTS.DASHBOARD}/ratings`,
    configuration: `${ROOTS.DASHBOARD}/configuration`,
    account: `${ROOTS.DASHBOARD}/account`,
    feedbacks: `${ROOTS.DASHBOARD}/feedbacks`,
    budgets: `${ROOTS.DASHBOARD}/budgets`,
    services: {
      root: '/dashboard/services',
      overview: '/dashboard/services/overview',
      budgets: '/dashboard/services/budgets',
      orders: '/dashboard/services/orders',
      newBudget: '/dashboard/services/budgets/new',
      newOrder: '/dashboard/services/orders/new',
      viewBudget: (id: string) => `/dashboard/services/budgets/${id}`,
      viewOrder: (id: string) => `/dashboard/services/orders/${id}`,
    },
  },
};
