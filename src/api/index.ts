interface TFetchPriceAPIRequest {
  item: string;
  senderAddress: string;
  receiverAddress: string;
}

/**
 * 유저 정보 호출 API
 */
export const fetchUserInfo = async () => {
  // Mock API call
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'user123',
        name: '홍길동',
        phone: '010-1234-5678',
        address: '서울특별시 강남구 역삼동 123-45',
      });
    }, 1000);
  });
};

/**
 * 물품 종류 호출 API
 */
export const fetchItemAPI = async () => {
  // Mock API call
  return new Promise<{ items: string[] }>((resolve) => {
    setTimeout(() => {
      resolve({ items: ['사과', '바나나', '쌀', '보리'] });
    }, 1000);
  });
};

/**
 * 입력한 정보 토대로 가격 조회 API
 */
export const fetchPriceAPI = async (options: TFetchPriceAPIRequest) => {
  // Mock API call
  return new Promise<{ price: number }>((resolve) => {
    setTimeout(() => {
      resolve({ price: Math.floor(Math.random() * 10000) });
    }, 1000);
  });
};

/**
 * 저장한 form 데이터로 배달 접수 API
 */
export const submitFormAPI = async (data: any) => {
  // Mock API call
  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      // localStorage에 저장
      localStorage.setItem('deliveryForm', JSON.stringify(data));
    }, 1000);
  });
};

/**
 * 저장된 배송 데이터 로드 API
 */
export const fetchDeliveryListAPI = async () => {
  // Mock API call
  return new Promise<{ data: any }>((resolve) => {
    setTimeout(() => {
      const rawData = localStorage.getItem('deliveryForm');
      const rawForm = rawData ? JSON.parse(rawData) : null;
      resolve({ data: rawForm });
    }, 1000);
  });
};

/**
 * 배송 접수 submit API
 */
export const submitDeliveryAPI = async (data: any) => {
  // Mock API call
  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};
