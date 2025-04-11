import { z } from 'zod';

/**
 * 배송 양식을 검증하기 위한 스키마.
 * 
 * @property {string | null} item - 배송되는 항목. 문자열 또는 null일 수 있음.
 * @property {Object} sender - 발신자 정보.
 * @property {string} sender.name - 발신자의 이름. 비어 있지 않은 문자열이어야 함.
 * @property {string} sender.phone - 발신자의 전화번호. 비어 있지 않은 문자열이어야 함.
 * @property {string} sender.address - 발신자의 주소. 비어 있지 않은 문자열이어야 함.
 * @property {Object} receiver - 수신자 정보.
 * @property {string} receiver.name - 수신자의 이름. 비어 있지 않은 문자열이어야 함.
 * @property {string} receiver.phone - 수신자의 전화번호. 비어 있지 않은 문자열이어야 함.
 * @property {string} receiver.address - 수신자의 주소. 비어 있지 않은 문자열이어야 함.
 */
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

export default DeliveryFormSchema;
