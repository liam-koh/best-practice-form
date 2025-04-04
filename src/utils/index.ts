import _ from 'lodash';
/**
 * 숫자에 콤마 추가, nan이면 0원
 */
export const getNumberWithComma = (number: number) => {
  let n = 0;
  if (isNaN(number)) {
    n = 0;
  } else {
    n = number;
  }

  return n.toLocaleString();
};

/**
 * 쿼리파라미터 문자열로 변환
 * @param obj: 쿼리파라미터로 변환할 객체
 * @param encode: 인코딩 여부
 */
export const getQueryStringFromObject = (
  obj: Record<string, string | number | null | undefined>,
  encode?: boolean,
) => {
  const url = new URLSearchParams();
  Object.entries(obj).forEach(([key, value]) => {
    if (!_.isNil(value)) {
      url.append(key, value.toString());
    }
  });
  let str = url.toString();
  str = str === '' ? '' : `?${str}`;
  return encode ? encodeURIComponent(str) : str;
};
