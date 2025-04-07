import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
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
import { fetchDeliveryListAPI, fetchPriceAPI, submitDeliveryAPI } from '@/api';
import { useQuery } from '@tanstack/react-query';

const DeliveryFormSchema = z.object({
  // string or null
  item: z.string().nullable(),
  sender: z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    address: z.string().min(1),
  }),
  receiver: z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    address: z.string().min(1),
  }),
});

export type MDeliveryForm = z.infer<typeof DeliveryFormSchema>;

const mockItems = [
  { category: '과일류', options: ['사과', '바나나'] },
  { category: '곡물류', options: ['쌀', '보리'] },
];

export default function DeliveryFormApp() {
  const methods = useForm({
    resolver: zodResolver(DeliveryFormSchema),
    mode: 'onChange',
    defaultValues: {
      item: null,
      sender: { name: '', phone: '', address: '' },
      receiver: { name: '', phone: '', address: '' },
    },
  });

  const { register, watch, setValue, handleSubmit, reset, formState } = methods;

  const [modalOpen, setModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(true);

  const { data: estimatedPrice, isLoading } = useQuery({
    queryKey: [
      'price',
      watch('item'),
      watch('sender.address'),
      watch('receiver.address'),
    ],
    queryFn: async () => {
      const response = await fetchPriceAPI({
        item: watch('item'),
        senderAddress: watch('sender.address'),
        receiverAddress: watch('receiver.address'),
      });
      console.log('response', response);
      return response.price;
    },
    enabled:
      !!watch('item') &&
      !!watch('sender.address') &&
      !!watch('receiver.address'),
    placeholderData: (prev) => prev,
  });

  console.log(
    watch('item'),
    watch('sender.address'),
    watch('receiver.address'),
  );

  // 접수 API 모의
  const submitForm = async (data: any) => {
    await submitDeliveryAPI(data);
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
    <main className="w-screen h-screen">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="w-full flex justify-start items-start flex-col gap-4 p-4"
        >
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">배송 물품 선택</h2>
            <div className="w-1/2">
              <Select
                value={watch('item')}
                onValueChange={(value) => setValue('item', value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="배송 물품 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>배송 물품 선택</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {(['sender', 'receiver'] as const).map((type) => (
            <div key={type}>
              <h2 className="font-semibold">
                {type === 'sender' ? '출발지 정보' : '도착지 정보'}
              </h2>
              <Input
                {...register(`${type}.name`)}
                placeholder="이름"
                className="mt-2"
              />
              <Input
                {...register(`${type}.phone`)}
                placeholder="전화번호"
                className="mt-2"
              />
              <Input
                {...register(`${type}.address`)}
                placeholder="주소"
                className="mt-2"
              />
            </div>
          ))}
          <div className="flex justify-between gap-2">
            <h2 className="font-semibold">예상 배송비</h2>
            <p className="text-lg font-bold">
              {`${estimatedPrice ? estimatedPrice.toLocaleString() : 0}원`}
            </p>
          </div>
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
      </FormProvider>
    </main>
  );
}
