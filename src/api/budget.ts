import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';
import axios, { fetcher, endpoints } from 'src/utils/axios';
import { IBudget, ICreateBudget, IUpdateBudget } from '@/types/budget';

const URL = endpoints.budget;

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetBudgets() {
  const URL_SERVER = `/budget`;

  const { data, isLoading, error, isValidating } = useSWR(URL_SERVER, fetcher);

  const memoizedValue = useMemo(
    () => ({
      budgets: (data as IBudget[]) ?? [],
      budgetsLoading: isLoading,
      budgetsError: error,
      budgetsValidating: isValidating,
      budgetsEmpty: !isLoading && (!data || data.length === 0),
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createBudget(budget: ICreateBudget) {
  const response = await axios.post(URL.create, budget);
  mutate(URL.findAll);
  return response.data;
}

export async function updateBudget(id: string, budget: IUpdateBudget) {
  const response = await axios.patch(URL.update(id), budget);
  mutate(URL.findAll);
  return response.data;
}

export function useGetOneBudget(id: string) {
  const URL_FIND_ONE = URL.findOne(id);
  const { data, isLoading, error, isValidating } = useSWR(URL_FIND_ONE, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      budget: data as IBudget,
      budgetLoading: isLoading,
      budgetError: error,
      budgetValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function deleteBudget(id: string) {
  const response = await axios.delete(URL.delete(id));
  mutate(URL.findAll);
  return response.data;
}

// Hook específico para buscar orçamentos por cliente
export function useGetClientBudgets(clientCPF: string) {
  const URL_SERVER = `/budget?clientCPF=${clientCPF}`;

  const { data, isLoading, error, isValidating } = useSWR(
    clientCPF ? URL_SERVER : null,
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      clientBudgets: (data as IBudget[]) ?? [],
      clientBudgetsLoading: isLoading,
      clientBudgetsError: error,
      clientBudgetsValidating: isValidating,
      clientBudgetsEmpty: !isLoading && (!data || data.length === 0),
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
} 