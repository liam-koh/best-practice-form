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

const DeliveryFormSchema = z.object({
  items: z
    .array(
      z.object({
        category: z.string(),
        name: z.string(),
        quantity: z.number().min(1),
      }),
    )
    .min(1),
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

const mockItems = [
  { category: '과일류', options: ['사과', '바나나'] },
  { category: '곡물류', options: ['쌀', '보리'] },
];

export default function DeliveryFormApp() {
  const methods = useForm({
    resolver: zodResolver(DeliveryFormSchema),
    mode: 'onChange',
    defaultValues: {
      items: [],
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
        className="max-w-xl mx-auto space-y-6 p-4"
      >
        <div>
          <h2 className="font-semibold">배송 물품 선택</h2>
          {mockItems.map((group) => (
            <div key={group.category} className="mt-2">
              <p className="font-medium">{group.category}</p>
              {group.options.map((item) => {
                const matched = values.items.find((i: any) => i.name === item);
                return (
                  <div key={item} className="flex items-center gap-2 mt-1">
                    <input
                      type="checkbox"
                      checked={!!matched}
                      onChange={(e) => {
                        const current = values.items || [];
                        if (e.target.checked) {
                          setValue('items', [
                            ...current,
                            {
                              category: group.category,
                              name: item,
                              quantity: 1,
                            },
                          ]);
                        } else {
                          setValue(
                            'items',
                            current.filter((i: any) => i.name !== item),
                          );
                        }
                      }}
                    />
                    <span>{item}</span>
                    {matched && (
                      <Input
                        type="number"
                        className="w-24"
                        value={matched.quantity}
                        min={1}
                        onChange={(e) => {
                          const updated = values.items.map((i: any) =>
                            i.name === item
                              ? { ...i, quantity: Number(e.target.value) }
                              : i,
                          );
                          setValue('items', updated);
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
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
          <Button type="button" onClick={saveTemp} variant="outline">
            임시저장
          </Button>
          <Button type="button" onClick={loadTemp} variant="secondary">
            불러오기
          </Button>
          <Button type="submit" disabled={!formState.isValid}>
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
