import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';
import axios, { fetcher, endpoints } from 'src/utils/axios';
import { ICreateFeedback, IFeedback, IUpdateFeedback } from '@/types/feedback';

const URL = endpoints.feedback;

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetFeedbacks() {
  const URL_SERVER = `/feedback`;

  const { data, isLoading, error, isValidating } = useSWR(URL_SERVER, fetcher);

  const memoizedValue = useMemo(
    () => ({
      feedbacks: (data as IFeedback[]) ?? [],
      feedbacksLoading: isLoading,
      feedbacksError: error,
      feedbacksValidating: isValidating,
      feedbacksEmpty: !isLoading && (!data || data.length === 0),
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createFeedback(feedback: ICreateFeedback) {
  const URL_CREATE = URL.create;
  const response = await axios.post(URL_CREATE, feedback);
  mutate(URL.findAll, false);
  return response.data;
}

export async function updateFeedback(id: number, feedback: IUpdateFeedback) {
  const URL_UPDATE = URL.update(id);
  const response = await axios.patch(URL_UPDATE, feedback);
  mutate(URL.findAll, false);
  return response.data;
}

export function useGetOneFeedback(id: number) {
  const URL_FIND_ONE = URL.findOne(id);
  const { data, isLoading, error, isValidating } = useSWR(URL_FIND_ONE, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      feedback: data as IFeedback,
      feedbackLoading: isLoading,
      feedbackError: error,
      feedbackValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function deleteFeedback(id: number) {
  const URL_DELETE = URL.delete(id);
  const response = await axios.delete(URL_DELETE);
  mutate(URL.findAll, false);
  return response.data;
}

type FeedbackData = {
  feedbackId: number;
  serviceOrder?: any[]
  client?: any;
}
export function useGetFeedbackByToken(token?: string | null) {
  const { data, isLoading, error } = useSWR(
    token ? `${endpoints.feedback.getByToken(token)}` : null,
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      feedbackData: data as FeedbackData,
      loading: isLoading,
      error,
    }),
    [data, error, isLoading]
  );

  return memoizedValue;
}

export async function createClientFeedback(feedbackId: number, data: any) {
  const response = await axios.post(endpoints.feedback.createClient(feedbackId), data);
  return response.data;
} 