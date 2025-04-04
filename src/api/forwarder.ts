import {
  IFetchShipmentDetailReqModel,
  IFetchShipmentListReqModel,
  IFetchShipmentListResModel,
  ILoginReqModel,
  ILoginResModel,
  IModifyShipmentCostReqModel,
  IModifyShipmentProgressReqModel,
} from '@/types';
import API from '.';
import { getQueryStringFromObject } from '@/utils';

/** 로그인 Api */
export const userLogin = async (data: ILoginReqModel) => {
  const res = await API.post<ILoginResModel>('/login', data);
  return res.data;
};

/** 수출입목록 검색 */
export const fetchShipmentList = async (params: IFetchShipmentListReqModel) => {
  const queryStr = getQueryStringFromObject({ ...params });
  const res = await API.get<IFetchShipmentListResModel>(
    '/shipments' + queryStr,
  );
  return res.data;
};

/** 수출입 상세조회 */
export const fetchShipmentDetail = async ({
  order_no,
}: IFetchShipmentDetailReqModel) => {
  const res = await API.get(`/shipments/${order_no}`);
  return res.data;
};

/** 수출입 주문 진행상태 변경 */
export const modifyShipmentProgress = async ({
  order_no,
  progress,
}: IModifyShipmentProgressReqModel) => {
  const res = await API.post(`/shipments/${order_no}/progress`, { progress });
  return res.data;
};

/** 수출입 주문 비용 변경 */
export const modifyShipmentCost = async ({
  order_no,
  cost,
}: IModifyShipmentCostReqModel) => {
  const res = await API.post(`/shipments/${order_no}/cost`, { cost });
  return res.data;
};
