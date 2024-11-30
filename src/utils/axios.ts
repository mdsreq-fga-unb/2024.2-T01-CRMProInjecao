import axios from 'axios';
// config
import { HOST_API } from '@/config-global';

// ----------------------------------------------------------------------
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    profile: '/auth/profile',
    validateToken: '/auth/validate-token',
  }
}

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)

);

export default axiosInstance;


// ----------------------------------------------------------------------

