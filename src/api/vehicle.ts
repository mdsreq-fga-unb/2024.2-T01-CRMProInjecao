import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';
// utils
import axios, { fetcher, endpoints } from 'src/utils/axios';
//types
import { createVehicle, IVehicle } from '@/types/vehicle';
// ----------------------------------------------------------------------

const URL = endpoints.vehicle;

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

export async function useCreateVehicle(vehicle: createVehicle) {
  const URL_CREATE = URL.create;
  const data = {
    ...vehicle,
  };
  const response = await axios.post(URL_CREATE, data);
  mutate(URL, (currentData) => {
    const vehicles = currentData as IVehicle[];

    return [...vehicles, response.data];
  });
  return response.data;
}

export async function getOneVehicle(plate: string) {
  const URL_FIND_ONE = URL.findOne.replace(':plate', plate);
  const { data, isLoading, error, isValidating } = useSWR(URL_FIND_ONE, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      vehicle: data as IVehicle,
      vehicleLoading: isLoading,
      vehicleError: error,
      vehicleValidating: isValidating,
      vehicleEmpty: !isLoading && !data?.ordered.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
