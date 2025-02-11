import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';
// utils
import axios, { fetcher, endpoints } from 'src/utils/axios';
// types
import { ICreateUser, IUpdateUser, IUser } from '@/types/user';

// ----------------------------------------------------------------------

const URL = endpoints.user;

export function useGetUsers() {
  const URL_SERVER = `/user`;

  const { data, isLoading, error, isValidating } = useSWR(URL_SERVER, fetcher);

  const memoizedValue = useMemo(
    () => ({
      users: (data as IUser[]) ?? [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !isLoading && (!data || data.length === 0),
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createUser(user: ICreateUser) {
  const URL_CREATE = URL.create;
  const response = await axios.post(URL_CREATE, user);
  mutate(URL.findAll, false);
  return response.data;
}

export async function updateUser(id: string, user: IUpdateUser) {
  const URL_UPDATE = URL.update(id);
  const response = await axios.patch(URL_UPDATE, user);
  mutate(URL.findAll, false);
  return response.data;
}

export async function deleteUser(id: string) {
  const URL_DELETE = URL.delete(id);
  const response = await axios.delete(URL_DELETE);
  mutate(URL.findAll, false);
  return response.data;
}
