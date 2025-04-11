import { MDeliveryForm } from '@/types/delivery.interface';

const defaultForm: MDeliveryForm = {
  item: null,
  sender: {
    name: '',
    phone: '',
    address: '',
  },
  receiver: { name: '', phone: '', address: '' },
};

export default defaultForm;
