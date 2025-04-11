import { MDeliveryForm } from '@/types/delivery.interface';

const defaultDeliveryForm: MDeliveryForm = {
  item: null,
  sender: {
    name: '',
    phone: '',
    address: '',
  },
  receiver: { name: '', phone: '', address: '' },
};

export default defaultDeliveryForm;
