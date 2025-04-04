/** forwarder submit form */
export interface IForwarderFormModel {
  /**
   *  수출입
   */
  classification: 'EXPORT' | 'IMPORT';
  /**
   * 운송모드
   */
  transportMode: 'OCEAN' | 'AIR';
  /**
   *  출발지
   */
  origin: IForwarderAddress;
  /**
   *  도착지
   */
  destination: IForwarderAddress;
  /**
   *  인코텀즈
   */
  incoterms:
    | 'CFR'
    | 'CIF'
    | 'CIP'
    | 'CPT'
    | 'DAP'
    | 'DPU'
    | 'DDP'
    | 'EXW'
    | 'FAS'
    | 'FCA'
    | 'FOB';
  /**
   *  출고예정일
   */
  expectedDepartureDate: Date | null;
  /**
   * Dimension
   */
  dimension: {
    /** 가로 */
    width: number;
    /** 세로 */
    height: number;
    /** 높이 */
    length: number;
    /** 단위 */
    unit: 'cm' | 'm' | 'mm' | 'inch';
  };
  /** 운송 타입 */
  transportType: 'FCL' | 'LCL';
  /** cntr */
  cntr: {
    /** 컨테이너의 유형 */
    container:
      | 'DANGEROUS'
      | 'DRY'
      | 'FLAT RACK'
      | 'OPEN TOP'
      | 'REEFER'
      | 'OTHER';
    /** 크기 */
    size: '20ft' | '40ft' | '45ft' | '40HC';
    /** 수량 */
    amount: number;
  };
  /** 컨테이너 개별중량 */
  gWeight: string;
  /** 가격 */
  price: {
    /** 통화 */
    currency: 'KRW' | 'USD' | 'CNY' | 'EUR';
    /** 총 물품가액 */
    amount: number;
  };
  packing: {
    unit:
      | 'BAGS'
      | 'BALES'
      | 'BOX'
      | 'BUNDLES'
      | 'CANS'
      | 'CARBOYS'
      | 'CARTON'
      | 'CASES'
      | 'CRATES'
      | 'CYLINDERS'
      | 'DRUMS'
      | 'LOOSE'
      | 'PACKAGE'
      | 'PAILS'
      | 'PALLET'
      | 'PIPES'
      | 'REELS'
      | 'ROLLS'
      | 'TUBES'
      | 'WOODEN BOX'
      | 'OTHER';
    amount: number;
  };
  /** HS CODE */
  hsCode: string;
}

interface IForwarderAddress {
  /**
   *  국가
   */
  country: string;
  /**
   * 항만/공항명
   */
  port?: string;
  /**
   *  주소: locationType 내륙일때만 필수
   */
  address?: string;
}

// FIXME: model 1개로 통합
export interface IForwarderSubmitFormModel {
  /** 수출입 */
  type: IForwarderFormModel['classification'];
  /** 운송모드 */
  transport_mode: IForwarderFormModel['transportMode'];
  /** 출발지 주소 */
  departure: IForwarderAddress['address'];
  /** 출발지 국가 */
  departure_country: IForwarderAddress['country'];
  /** 출발지 항만명 */
  departure_port?: IForwarderAddress['port'];
  /** 도착지 주소 */
  arrival: IForwarderAddress['address'];
  /** 도착지 국가 */
  arrival_country: IForwarderAddress['country'];
  /** 도착지 항만명 */
  arrival_port?: IForwarderAddress['port'];
  /** 인코텀즈 */
  incoterms: IForwarderFormModel['incoterms'];
  /** 운송타입 */
  transport_type: IForwarderFormModel['transportType'];
  /** HS 코드 */
  hs_code: IForwarderFormModel['hsCode'];
  /** 컨테이너 유형 */
  container_type?: IForwarderFormModel['cntr']['container'];
  /** 컨테이너 크기 */
  container_size?: IForwarderFormModel['cntr']['size'];
  /** lcl: packaging 수량, fcl: cntr 수량 */
  quantity?: IForwarderFormModel['cntr']['amount'];
  /** 패키징 유형 */
  packaging_type?: IForwarderFormModel['packing']['unit'];
  /** 패키징 길이 (가로) */
  packaging_length?: IForwarderFormModel['dimension']['length'];
  /** 패키징 너비 (세로) */
  packaging_width?: IForwarderFormModel['dimension']['width'];
  /** 패키징 높이 (높이) */
  packaging_height?: IForwarderFormModel['dimension']['height'];
  /** 크기 단위 */
  size_unit?: IForwarderFormModel['dimension']['unit'];
  /** 중량 (G.Weight) */
  weight: IForwarderFormModel['gWeight'];
  /** 총 물품가액 */
  product_price: IForwarderFormModel['price']['amount'];
  /** 통화 */
  currency: IForwarderFormModel['price']['currency'];
  /** 출고 예정일 */
  export_date: string;
}
