import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchUserInfo } from '@/api';
import DeliveryFormSchema from '@/utils/delivery-validaation';
import DeliveryFormView from './DeliveryFormView';
import defaultDeliveryForm from '@/constants/defaultDeliveryForm';

export default function DeliveryFormApp() {
  const methods = useForm({
    resolver: zodResolver(DeliveryFormSchema),
    mode: 'onChange',
    defaultValues: async () => {
      const userInfo = await fetchUserInfo();
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
