import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';
import axios, { fetcher, endpoints } from 'src/utils/axios';
import { CreateProductDTO } from '@/types/product';
import { ICategory } from '@/types/category';

const URL = endpoints.category;

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

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
