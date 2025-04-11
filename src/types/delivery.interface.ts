import DeliveryFormSchema from '@/utils/delivery-validaation';
import { z } from 'zod';

export type MDeliveryForm = z.infer<typeof DeliveryFormSchema>;
