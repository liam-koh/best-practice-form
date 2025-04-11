import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DeliveryFormSchema from '@/utils/delivery-validaation';
import DeliveryFormView from './DeliveryFormView';
import defaultDeliveryForm from '@/constants/defaultDeliveryForm';
import { queryClient, userInfoQueryOptions } from '@/hooks/useDeliveryHooks';
import { useState } from 'react';

export default function DeliveryFormApp() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const methods = useForm({
    resolver: zodResolver(DeliveryFormSchema),
    mode: 'onChange',
    defaultValues: async () => {
      try {
        setIsLoading(true);
        const userInfo = await queryClient.fetchQuery(userInfoQueryOptions);
        return {
          ...defaultDeliveryForm,
          sender: {
            name: userInfo.name,
            phone: userInfo.phone,
            address: userInfo.address,
          },
        };
      } catch (e) {
        setIsError(true);
        return defaultDeliveryForm;
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <main className="max-w-[50vw] h-screen">
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          Loading...
        </div>
      )}
      {isError && (
        <div className="w-full h-full flex justify-center items-center">
          접수할 수 없습니다. 나중에 다시 시도해주세요
        </div>
      )}
      {!isLoading && !isError && (
        <FormProvider {...methods}>
          <DeliveryFormView />
        </FormProvider>
      )}
    </main>
  );
}
