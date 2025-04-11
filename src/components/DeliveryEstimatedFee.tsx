import { useEstimatedPrice } from '@/hooks/useDeliveryHooks';
import { MDeliveryForm } from '@/types/delivery.interface';
import { useFormContext } from 'react-hook-form';

export default function DeliveryEstimatedFee({
  item,
  senderAddress,
  receiverAddress,
}: {
  item: MDeliveryForm['item'];
  senderAddress: MDeliveryForm['sender']['address'];
  receiverAddress: MDeliveryForm['receiver']['address'];
}) {
  const { data: estimatedPrice, isLoading } = useEstimatedPrice({
    item,
    senderAddress,
    receiverAddress,
  });

  return (
    <div className="flex justify-between gap-2">
      <h2 className="font-semibold">예상 배송비</h2>
      <p className="text-lg font-bold">
        {`${estimatedPrice ? estimatedPrice.toLocaleString() : 0}원`}
      </p>
    </div>
  );
}
