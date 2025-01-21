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
};
