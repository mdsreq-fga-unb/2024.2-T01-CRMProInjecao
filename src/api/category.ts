import { useMemo } from 'react';
import useSWR from 'swr';
import { fetcher, endpoints } from 'src/utils/axios';
import { ICategory } from '@/types/category';

const URL = endpoints.category;

export function useGetCategories() {
  const URL_FIND_ALL = URL.findAll;
  const { data, isLoading, error, isValidating } = useSWR(URL_FIND_ALL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      categories: (data as ICategory[]) ?? [],
      categoriesLoading: isLoading,
      categoriesError: error,
      categoriesIsValidating: isValidating,
      categoriesEmpty: !isLoading && (!data || data.length === 0),
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
