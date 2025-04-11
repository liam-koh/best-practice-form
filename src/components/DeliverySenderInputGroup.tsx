import { MDeliveryForm } from '@/types/delivery.interface';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from './ui/input';

export default function DeliverySenderInputGroup() {
  const { register } = useFormContext<MDeliveryForm>();
  return (
    <div className="w-full">
      <h2 className="font-semibold">출발지 정보</h2>
      <Input {...register(`sender.name`)} placeholder="이름" className="mt-2" />
      <Input
        {...register(`sender.phone`)}
        placeholder="전화번호"
        className="mt-2"
      />
      <Input
        {...register(`sender.address`)}
        placeholder="주소"
        className="mt-2"
      />
    </div>
  );
}
