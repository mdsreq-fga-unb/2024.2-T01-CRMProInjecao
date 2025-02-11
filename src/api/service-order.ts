import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';
import axios, { fetcher, endpoints } from 'src/utils/axios';
import {
  IServiceOrder,
  ICreateServiceOrder,
  IServiceOrderType,
  ICreateServiceOrderType,
  IUpdateServiceOrderType,
} from '@/types/service-order';

const URL = endpoints.serviceOrder;

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// Service Orders
export function useGetServiceOrder(id?: string) {
  const { data, isLoading, error, mutate:theMuta } = useSWR(
    id ? `${endpoints.serviceOrder.findOne(id)}` : null,
    fetcher
  );

  const serviceOrder = useMemo(
    () => (data as IServiceOrder) || null,
    [data]
  );

  return {
    serviceOrder,
    loading: isLoading,
    error,
    mutate: theMuta
  };
}

export function useGetServiceOrders() {
  const URL_SERVER = `/service-order`;

  const { data, isLoading, error, isValidating } = useSWR(URL_SERVER, fetcher);

  const memoizedValue = useMemo(
    () => ({
      serviceOrders: (data as IServiceOrder[]) ?? [],
      serviceOrdersLoading: isLoading,
      serviceOrdersError: error,
      serviceOrdersValidating: isValidating,
      serviceOrdersEmpty: !isLoading && (!data || data.length === 0),
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createServiceOrder(serviceOrder: ICreateServiceOrder) {
  const response = await axios.post(URL.create, serviceOrder);
  mutate(URL.findAll);
  return response.data;
}

export async function updateServiceOrder(id: string, data: any, refreshData?: () => Promise<any>) {
  const response = await axios.patch(URL.update(id), data);
  mutate(URL.findAll);
  return response.data;
}

export function useGetOneServiceOrder(id: string) {
  const URL_FIND_ONE = URL.findOne(id);
  const { data, isLoading, error, isValidating } = useSWR(URL_FIND_ONE, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      serviceOrder: data as IServiceOrder,
      serviceOrderLoading: isLoading,
      serviceOrderError: error,
      serviceOrderValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function deleteServiceOrder(id: string) {
  const response = await axios.delete(URL.delete(id));
  mutate(URL.findAll);
  return response.data;
}

// Service Order Types
export function useGetServiceOrderTypes() {
  const URL_SERVER = `/service-order/type`;

  const { data, isLoading, error, isValidating } = useSWR(URL_SERVER, fetcher);

  const memoizedValue = useMemo(
    () => ({
      serviceOrderTypes: (data as IServiceOrderType[]) ?? [],
      serviceOrderTypesLoading: isLoading,
      serviceOrderTypesError: error,
      serviceOrderTypesValidating: isValidating,
      serviceOrderTypesEmpty: !isLoading && (!data || data.length === 0),
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createServiceOrderType(type: ICreateServiceOrderType) {
  const response = await axios.post(`${URL.create}/type`, type);
  mutate(`${URL.findAll}/type`);
  return response.data;
}

export async function updateServiceOrderType(id: string, type: IUpdateServiceOrderType) {
  const response = await axios.patch(`${URL.update(id)}/type`, type);
  mutate(`${URL.findAll}/type`);
  return response.data;
}

export function useGetOneServiceOrderType(id: string) {
  const URL_FIND_ONE = `${URL.findOne(id)}/type`;
  const { data, isLoading, error, isValidating } = useSWR(URL_FIND_ONE, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      serviceOrderType: data as IServiceOrderType,
      serviceOrderTypeLoading: isLoading,
      serviceOrderTypeError: error,
      serviceOrderTypeValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function deleteServiceOrderType(id: string) {
  const response = await axios.delete(`${URL.delete(id)}/type`);
  mutate(`${URL.findAll}/type`);
  return response.data;
}

// Novo hook para a view de detalhes
export function useGetServiceOrderDetails(id?: string) {
  const { data, isLoading, error, mutate: thaMutate } = useSWR(
    id ? `${endpoints.serviceOrder.findOne(id)}` : null,
    fetcher
  );

  const serviceOrder = useMemo(
    () => (data as IServiceOrder) || null,
    [data]
  );

  return {
    serviceOrder,
    loading: isLoading,
    error,
    mutate: thaMutate,
  };
} 