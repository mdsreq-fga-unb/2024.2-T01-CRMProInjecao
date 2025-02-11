import axios, { AxiosRequestConfig } from 'axios';
// config
import { HOST_API } from '@/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.data && error.response.data.statusCode === 401) {
      if (!window.location.pathname.includes('/auth')) {
        window.location.href = '/error/no-permission';
      }
      Promise.reject(
        (error.response && error.response.data) ||
          'Houve um problema com a autenticação, tente novamente!'
      );
    }

    if (error.response && error.response.data && error.response.data.statusCode === 403) {
      if (!window.location.pathname.includes('/auth')) {
        window.location.href = '/error/no-permission';
      }
      Promise.reject(
        (error.response && error.response.data) ||
          'Você não tem permissão para acessar este recurso!'
      );
    }

    if (error.response && error.response.data && error.response.data.statusCode === 500) {
      window.location.href = '/error/internal-error';
    }

    Promise.reject(
      (error.response && error.response.data) ||
        'Estamos com problemas técnicos, tente novamente mais tarde!'
    );
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  user: {
    findAll: '/user',
    create: '/user',
    findOne: (id: string) => `/user/${id}`,
    update: (id: string) => `/user/${id}`,
    delete: (id: string) => `/user/${id}`,
  },
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    profile: '/auth/profile',
    validateToken: '/auth/validate-token',
  },
  client: {
    findAll: '/client',
    create: '/client',
    findOne: (cpf: string) => `/client/${cpf}`,
    update: (cpf: string) => `/client/${cpf}`,
    delete: (cpf: string) => `/client/${cpf}`,
  },
  vehicle: {
    findAll: '/vehicle',
    create: '/vehicle',
    findOne: (licensePlate: string) => `/vehicle/${licensePlate}`,
    update: (licensePlate: string) => `/vehicle/${licensePlate}`,
    delete: (licensePlate: string) => `/vehicle/${licensePlate}`,
  },
  feedback: {
    create: '/feedback',
    findAll: '/feedback',
    findOne: (id: number) => `/feedback/${id}`,
    update: (id: number) => `/feedback/${id}`,
    delete: (id: number) => `/feedback/${id}`,
    getByToken: (token: string) => `/feedback/token/${token}`,
    createClient: '/feedback/client',
  },
  serviceOrder: {
    findAll: '/service-order',
    findOne: (id: string) => `/service-order/${id}`,
    create: '/service-order',
    update: (id: string) => `/service-order/${id}`,
    delete: (id: string) => `/service-order/${id}`,
  },
  budget: {
    findAll: '/budget',
    findOne: (id: string) => `/budget/${id}`,
    create: '/budget',
    update: (id: string) => `/budget/${id}`,
    delete: (id: string) => `/budget/${id}`,
  },
  product: {
    create: '/products',
    findAll: '/products',
    findOne: (id: string) => `/products/${id}`,
    update: (id: string) => `/products/${id}`,
    delete: (id: string) => `/products/${id}`,
  },
  category: {
    findAll: '/category',
    create: '/category',
    findOne: (id: string) => `/category/${id}`,
    update: (id: string) => `/category/${id}`,
    delete: (id: string) => `/category/${id}`,
  },
  serviceHistory: {
    findByBudget: '/service-history/budget',
    findByServiceOrder: '/service-history/service-order',
  },
  services: {
    root: '/dashboard/services',
    overview: '/dashboard/services/overview',
    budgets: '/dashboard/services/budgets',
    orders: '/dashboard/services/orders',
    newBudget: '/dashboard/services/budgets/new',
    newOrder: '/dashboard/services/orders/new',
    viewBudget: (id: string) => `/dashboard/services/budgets/${id}`,
    viewOrder: (id: string) => `/dashboard/services/orders/${id}`,
    stats: '/service-stats',
    recent: '/service-stats/recent',
  },
};
