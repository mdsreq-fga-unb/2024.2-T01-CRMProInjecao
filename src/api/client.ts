import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';
// utils
import axios, { fetcher, endpoints } from 'src/utils/axios';
// types
import { ICreateClient, IClient } from '@/types/client';

// ----------------------------------------------------------------------

const URL = endpoints.client;

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetClients() {
  const URL_SERVER = `/client`;

  const { data, isLoading, error, isValidating } = useSWR(URL_SERVER, fetcher);

  const memoizedValue = useMemo(
    () => ({
      clients: (data as IClient[]) ?? [],
      clientsLoading: isLoading,
      clientsError: error,
      clientsValidating: isValidating,
      clientsEmpty: !isLoading && (!data || data.length === 0),
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createClient(client: ICreateClient) {
  const URL_CREATE = URL.create;
  const response = await axios.post(URL_CREATE, client);
  mutate(URL.findAll, false);
  return response.data;
}

export async function updateClient(cpf: string, client: Partial<ICreateClient>) {
  const URL_UPDATE = URL.update(cpf);
  const response = await axios.patch(URL_UPDATE, client);
  mutate(URL.findAll, false);
  return response.data;
}

export function useGetOneClient(cpf: string) {
  const URL_FIND_ONE = URL.findOne(cpf);
  const { data, isLoading, error, isValidating } = useSWR(URL_FIND_ONE, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      client: data as IClient,
      clientLoading: isLoading,
      clientError: error,
      clientValidating: isValidating,
      clientEmpty: !isLoading && !data?.ordered.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function deleteClient(cpf: string) {
  const URL_DELETE = URL.delete(cpf);
  const response = await axios.delete(URL_DELETE);
  mutate(URL.findAll, false);
  return response.data;
}
