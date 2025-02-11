import useSWR from 'swr';
import { useMemo } from 'react';
import { fetcher, endpoints } from '@/utils/axios';

export interface ServiceStats {
  pendingBudgets: number;
  acceptedBudgets: number;
  canceledBudgets: number;
  activeOrders: number;
  completedOrders: number;
  averageTicket: number;
  conversionRate: number;
  canceledOrders: number;
  totalRevenue: number;
}

export function useGetServiceStats() {
  const { data, isLoading, error, mutate } = useSWR(
    endpoints.services.stats,
    fetcher
  );

  const stats = useMemo(
    () => (data as ServiceStats) || null,
    [data]
  );

  return {
    stats,
    loading: isLoading,
    error,
    mutate,
  };
}

export function useGetRecentServices() {
  const { data, isLoading, error, mutate } = useSWR(
    endpoints.services.recent,
    fetcher
  );

  const recentServices = useMemo(
    () => data || [],
    [data]
  );

  return {
    recentServices,
    loading: isLoading,
    error,
    mutate,
  };
} 