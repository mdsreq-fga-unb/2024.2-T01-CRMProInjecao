import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';
// utils
import axios, { fetcher, endpoints } from 'src/utils/axios';
//types
import { IClient } from '@/types/client';

// ----------------------------------------------------------------------

const URL = endpoints.client;

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ------------------ Rota nao implementada ainda no backend
// export function useGetClients() {
//   const URL_GET_CLIENTS = URL.getAll;
//   const { data, isLoading, error, isValidating } = useSWR<IClient[]>(URL_GET_CLIENTS, fetcher);

//   const memoizedValue = useMemo(
//     () => ({
//       clients: data as IClient[],
//       clientsLoading: isLoading,
//       clientsError: error,
//       clientsValidating: isValidating,
//       clientsEmpty: !isLoading && !data?.length,
//     }),
//     [data, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }

export async function createClient(client: IClient) {
  const URL_CREATE = URL.create;
  const data = {
    ...client,
  };
  const response = await axios.post(URL_CREATE, data);
  mutate(URL, (currentData) => {
    const clients = currentData as IClient[];

    return [...clients, response.data];
  });
  return response.data;
}

export async function getOneClient(cpf: string) {
  const URL_FIND_ONE = URL.findOne.replace(':cpf', cpf);
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
