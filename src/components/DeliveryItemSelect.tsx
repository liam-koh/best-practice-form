import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MDeliveryForm } from '@/types/delivery.interface';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export default function DeliveryItemSelect() {
  const {
    watch,
    setValue,
    formState: { errors, isSubmitted },
    setError,
  } = useFormContext<MDeliveryForm>();

  useEffect(() => {
    // 값 없으면 에러
    if (!watch('item') && isSubmitted) {
      setError('item', {
        type: 'manual',
        message: '배송 물품을 선택해주세요.',
      });
    } else {
      // 에러 없으면 에러 제거
      if (errors.item && isSubmitted) {
        setError('item', {
          type: 'manual',
          message: '',
        });
      }
    }
  }, [watch('item'), setValue, errors]);

  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="font-semibold">배송 물품 선택</h2>
      <Select
        value={watch('item')}
        onValueChange={(value) => setValue('item', value)}
      >
        <SelectTrigger>
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
      {errors.item && <p className="text-red-500">{errors.item.message}</p>}
    </div>
  );
}
