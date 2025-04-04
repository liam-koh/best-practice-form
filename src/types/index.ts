import { IForwarderSubmitFormModel } from './forwarder.model';

// 포워더 수출입 진행상태
export const SHIPMENT_PROGRESS = {
  RECEIPT_REQUEST: '접수 요청',
  RECEIPT_COMPLETE: '접수 완료',
  DEPARTURE_CUSTOMS: '출발지 통관',
  DEPARTURE_DEPART: '출발지 국가에서 출발',
  ARRIVAL_ARRIVE: '도착지 국가에 도착',
  ARRIVAL_CUSTOMS: '도착지 통관',
  INLAND_TRANSPORT_PREPARE: '내륙 운송 준비',
  IN_TRANSIT: '배송중',
  DELIVERY_COMPLETE: '배송 완료',
  CANCEL_REQUEST: '취소 요청',
  CANCEL_COMPLETE: '취소 완료',
} as const;
export type SHIPMENT_PROGRESS =
  (typeof SHIPMENT_PROGRESS)[keyof typeof SHIPMENT_PROGRESS];

/**
 * 로그인 요청 model
 */
export interface ILoginReqModel {
  /** 로그인 id */
  login_id: string;
  /** 비밀번호 */
  password: string;
}

/**
 * 로그인 응답 model
 */
export interface ILoginResModel {
  /** access 토큰 */
  data: {
    token: string;
  };
}

/**
 * 수출입목록 검색 요청 model
 */
export interface IFetchShipmentListReqModel {
  /** 주문번호 */
  order_no?: string;
  progress?: SHIPMENT_PROGRESS;
  /** 시작일 */
  start_date?: string;
  /** 종료일 */
  end_date?: string;
  /** 보여줄 데이터수 */
  per_page?: number;
  /** 현재 페이지 */
  page?: number;
}

/**
 * 수출입목록 검색 응답 model
 */
export interface IFetchShipmentListResModel {
  data: IFetchShipmentDetailModel[];
  total: number;
  last_page: number;
}

export interface IFetchShipmentDetailReqModel {
  order_no: string;
}

/** forwarder 상세 model */
// 새로운 인터페이스 정의
export interface IFetchShipmentDetailModel extends IForwarderSubmitFormModel {
  /** 주문 번호 */
  order_no: string;
  /** 진행 상태 */
  progress: string;
  /** 접수부서 */
  receipt_dept: string;
  /** 접수자 */
  receipt_name: string;
  /** 가격 */
  cost: number;
  /** 생성일 */
  created_at: string;
}

/** 수출입 주문 진행상태 변경 req model */
export interface IModifyShipmentProgressReqModel {
  /** 주문번호 */
  order_no: string;
  /** 변경할 상태 */
  progress: SHIPMENT_PROGRESS;
}

/** 수출입 주문 진행상태 변경 res model */
export interface IModifyShipmentProgressResModel {
  /** 변경된 상태 */
  data: 'OK';
}

/** 수출입 주문 비용 변경 req model */
export interface IModifyShipmentCostReqModel {
  /** 주문번호 */
  order_no: string;
  /** 변경할 비용 */
  cost: number;
}

/** 수출입 주문 비용 변경 res model */
export interface IModifyShipmentCostResModel {
  /** 변경된 비용 */
  cost: number;
}
