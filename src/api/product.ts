import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';
import axios, { fetcher, endpoints } from 'src/utils/axios';
import { CreateProductDTO, IProduct } from 'src/types/product';

const URL = endpoints.product;

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export async function createProductFunction(product: CreateProductDTO) {
  const URL_CREATE = URL.create;
  const response = await axios.post(URL_CREATE, product);
  mutate(URL.findAll, false);
  return response.data;
}

export function useGetProducts() {
  const URL_SERVER = URL.findAll;

  const { data, isLoading, error, isValidating } = useSWR(URL_SERVER, fetcher);

  const memoizedValue = useMemo(
    () => ({
      products: (data as IProduct[]) ?? [],
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && (!data || data.length === 0),
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;

}