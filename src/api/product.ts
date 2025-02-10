import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';
import axios, { fetcher, endpoints } from 'src/utils/axios';
import { CreateProductDTO, IProduct } from '@/types/product';

const URL = endpoints.product;

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetProductsByFilter(name: string | null, categoryId: string | null) {
  const URL_FIND_BY_FILTER = `${URL.findAll}?${name ? `name=${name}&` : ''}${categoryId ? `categoryId=${categoryId}` : ''}`;
  const { data, isLoading, error, isValidating } = useSWR(URL_FIND_BY_FILTER, fetcher, options);
  const memoizedValue = useMemo(
    () => ({
      products: (data as IProduct[]) ?? [],
      productsLoading: isLoading,
      productsError: error,
      productsIsValidating: isValidating,
      productsEmpty: !isLoading && (!data || data.length === 0),
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
