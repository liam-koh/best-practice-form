import React, { useEffect, useState } from 'react';
import {
  useForm,
  FormProvider,
  ResolverOptions,
  useFormContext,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  fetchDeliveryListAPI,
  fetchPriceAPI,
  fetchUserInfo,
  submitDeliveryAPI,
} from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useEstimatedPrice, useUserInfo } from '@/hooks/useDeliveryHooks';
import DeliveryFormSchema from '@/utils/delivery-validaation';
import DeliveryFormView from './DeliveryFormView';

export default function DeliveryFormApp() {
  const methods = useForm({
    resolver: zodResolver(DeliveryFormSchema),
    mode: 'onChange',
    defaultValues: async () => {
      const userInfo = await fetchUserInfo();
      return {
        ...defaultForm,
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