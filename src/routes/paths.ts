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
      resetPassword: `${ROOTS.AUTH}/reset-password`,
    }
  },
  dashboard: {
    root: ROOTS.DASHBOARD,
    clients: `${ROOTS.DASHBOARD}/clients`,
    serviceOrders: `${ROOTS.DASHBOARD}/service-orders`,
    products: `${ROOTS.DASHBOARD}/products`,
    inventory: `${ROOTS.DASHBOARD}/inventory`,
    ratings: `${ROOTS.DASHBOARD}/ratings`,
    configuration: `${ROOTS.DASHBOARD}/configuration`,
    account: `${ROOTS.DASHBOARD}/account`,
  },
  
};
