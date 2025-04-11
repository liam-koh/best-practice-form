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
import DeliveryItemSelect from './DeliveryItemSelect';
import DeliverySenderInputGroup from './DeliverySenderInputGroup';
import DeliveryReceiverInputGroup from './DeliveryReceiverInputGroup';
import { MDeliveryForm } from '@/types/delivery.interface';
import DeliveryEstimatedFee from './DeliveryEstimatedFee';

/**
 * 접수 form 화면
 */
export default function DeliveryFormView() {
  const methods = useFormContext<MDeliveryForm>();
  const { register, watch, setValue, handleSubmit, reset, formState } = methods;

  const [modalOpen, setModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(true);

  const { data: userInfo } = useUserInfo();

  // 접수 API 모의
  const submitForm = async (data: any) => {
    try {
      await submitDeliveryAPI(data);
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitSuccess(false);
    }
  };

  const onLoadSavedData = async () => {
    const savedData = await fetchDeliveryListAPI();
    if (savedData.data) {
      reset(savedData.data);
    }
  };

  const onSaveData = async () => {
    const savedData = await fetchDeliveryListAPI();
    if (savedData.data) {
      reset(savedData.data);
    }
  };

  return (
    <main className="max-w-[50vw] h-screen">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="w-full flex justify-start items-start flex-col gap-4 p-4"
      >
        <DeliveryItemSelect />
        <DeliverySenderInputGroup />
        <DeliveryReceiverInputGroup />
        <DeliveryEstimatedFee
          item={watch('item')}
          senderAddress={watch('sender.address')}
          receiverAddress={watch('receiver.address')}
        />
        <div className="flex justify-between gap-2">
          <Button type="submit" size="default" disabled={!formState.isValid}>
            접수하기
          </Button>
          <div className="flex gap-2">
            <Button onClick={onSaveData}>저장</Button>
            <Button
              type="button"
              variant="secondary"
              size="default"
              onClick={onLoadSavedData}
            >
              접수 내용 불러오기
            </Button>
          </div>
        </div>
      </form>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {submitSuccess ? '접수 성공' : '접수 실패'}
            </DialogTitle>
            <p>
              {submitSuccess
                ? '배송이 정상 접수되었습니다.'
                : '문제가 발생했습니다. 다시 시도해주세요.'}
            </p>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}
