import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';
import axios, { fetcher, endpoints } from 'src/utils/axios';
import { CreateProductDTO } from '@/types/product';

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
