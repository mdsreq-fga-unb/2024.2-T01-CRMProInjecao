import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';
import axios, { fetcher, endpoints } from 'src/utils/axios';
import { createVehicle, IupdateVehicle, IVehicle } from '@/types/vehicle';


const URL = endpoints.vehicle;

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetVehicles(clientCPF?: string) {
  const URL_SERVER = clientCPF ? `${URL.findAll}?clientCPF=${clientCPF}` : URL.findAll;
  const { data, isLoading, error, isValidating } = useSWR(URL_SERVER, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      vehicles: (data as IVehicle[]) ?? [],
      vehiclesLoading: isLoading,
      vehiclesError: error,
      vehiclesValidating: isValidating,
      vehiclesEmpty: !isLoading && (!data || data.length === 0),
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createVehicleFunction(vehicle: createVehicle) {
  const URL_CREATE = URL.create;
  const response = await axios.post(URL_CREATE, vehicle);
  mutate(URL.findAll, false);
  return response.data;
}

export function useGetOneVehicle(licensePlate: string) {
  const URL_FIND_ONE = URL.findOne(licensePlate);
  const { data, isLoading, error, isValidating } = useSWR(URL_FIND_ONE, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      vehicle: data as IVehicle ?? {} as IVehicle,
      vehicleLoading: isLoading,
      vehicleError: error,
      vehicleValidating: isValidating,
      vehicleEmpty: !isLoading && !data,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function updateVehicle(licensePlate: string, vehicle: IupdateVehicle) {
  const URL_UPDATE = URL.update(licensePlate);
  const response = await axios.patch(URL_UPDATE, vehicle);
  mutate(URL.findAll, false);
  return response.data;
}

export async function deleteVehicle(licensePlate: string) {
  const URL_DELETE = URL.delete(licensePlate);
  const response = await axios.delete(URL_DELETE);
  mutate(URL.findAll, false);
  return response.data;
}
