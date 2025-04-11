import React from 'react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { fetchUserInfo } from '@/api';
import { fetchPriceAPI } from '@/api';
import { useWatch } from 'react-hook-form';

export const userInfoQueryOptions = {
  queryKey: ['userInfo'],
  queryFn: fetchUserInfo,
};

export function useUserInfo() {
  return useSuspenseQuery(userInfoQueryOptions);
}

export function useEstimatedPrice({
  item,
  senderAddress,
  receiverAddress,
}: {
  item: string;
  senderAddress: string;
  receiverAddress: string;
}) {
  const queryOptions = {
    queryKey: ['price', item, senderAddress, receiverAddress],
    queryFn: async () => {
      const response = await fetchPriceAPI({
        item,
        senderAddress,
        receiverAddress,
      });
      console.log('response', response);
      return response.price;
    },
    enabled: Boolean(item && senderAddress && receiverAddress),
    placeholderData: (prev) => prev,
  };

  return useQuery(queryOptions);
}
