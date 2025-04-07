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

type TForm = z.infer<typeof DeliveryFormSchema>;

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
  const values = watch();

  const [price, setPrice] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(true);

  // 가격 계산 API 모의
  const fetchPrice = () => {
    const totalQty = values.items.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0,
    );
    setPrice(totalQty * 1000);
  };

  // 접수 API 모의
  const submitForm = (data: any) => {
    const success = Math.random() > 0.2; // 80% 확률 성공
    setSubmitSuccess(success);
    setModalOpen(true);
  };

  const saveTemp = () => {
    localStorage.setItem('deliveryForm', JSON.stringify(values));
  };

  const loadTemp = () => {
    const data = localStorage.getItem('deliveryForm');
    if (data) reset(JSON.parse(data));
  };

  useEffect(() => {
    fetchPrice();
  }, [values.items]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="w-full flex justify-start items-start flex-col gap-4 p-4"
      >
        <div className='flex flex-col gap-2'>
          <h2 className="font-semibold">
            배송 물품 선택
          </h2>
          <div className="w-1/2">
            <Select>
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

        <div>
          <p className="text-lg font-bold">
            예상 가격: {price ? `${price.toLocaleString()}원` : '-'}
          </p>
        </div>

        <div className="flex gap-2">
          <Button type="submit" size="default" disabled={!formState.isValid}>
            접수하기
          </Button>
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
  );
}
