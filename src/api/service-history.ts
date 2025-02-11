import useSWR from 'swr';
import { useMemo } from 'react';
import { fetcher, endpoints } from '@/utils/axios';
import { IServiceHistory } from '@/types/service-history';

export function useGetServiceHistoryByBudget(budgetId: string | null) {
  const { data, isLoading, error, mutate } = useSWR(
    budgetId ? `${endpoints.serviceHistory.findByBudget}/${budgetId}` : null,
    fetcher
  );

  const serviceHistory = useMemo(
    () => (data as IServiceHistory[]) || [],
    [data]
  );

  return {
    serviceHistory,
    serviceHistoryLoading: isLoading,
    serviceHistoryError: error,
    mutate,
  };
}

export function useGetServiceHistoryByServiceOrder(serviceOrderId: string | null) {
  const { data, isLoading, error, mutate } = useSWR(
    serviceOrderId ? `${endpoints.serviceHistory.findByServiceOrder}/${serviceOrderId}` : null,
    fetcher
  );

  const serviceHistory = useMemo(
    () => (data as IServiceHistory[]) || [],
    [data]
  );

  return {
    serviceHistory,
    serviceHistoryLoading: isLoading,
    serviceHistoryError: error,
    mutate,
  };
} 