import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DeliveryFormSchema from '@/utils/delivery-validaation';
import DeliveryFormView from './DeliveryFormView';
import defaultDeliveryForm from '@/constants/defaultDeliveryForm';
import { queryClient, userInfoQueryOptions } from '@/hooks/useDeliveryHooks';

export default function DeliveryFormApp() {
  const methods = useForm({
    resolver: zodResolver(DeliveryFormSchema),
    mode: 'onChange',
    defaultValues: async () => {
      const userInfo = await queryClient.fetchQuery(userInfoQueryOptions);
      return {
        ...defaultDeliveryForm,
        sender: {
          name: userInfo.name,
          phone: userInfo.phone,
          address: userInfo.address,
        },
      };
    },
  });

  return (
    <FormProvider {...methods}>
      <DeliveryFormView />
    </FormProvider>
  );
}
