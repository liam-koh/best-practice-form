import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MDeliveryForm } from './DeliveryFormApp';
import { useFormContext } from 'react-hook-form';

export default function DeliveryItemSelect() {
  const { register, watch, setValue } = useFormContext<MDeliveryForm>();
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="font-semibold">배송 물품 선택</h2>
      <div>
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
      </div>
    </div>
  );
}
