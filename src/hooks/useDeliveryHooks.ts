import { QueryClient, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { fetchUserInfo } from '@/api';
import { fetchPriceAPI } from '@/api';

export const queryClient = new QueryClient();

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
    enabled: Boolean(),
    placeholderData: (prev) => prev,
  };

  return useQuery(queryOptions);
}
