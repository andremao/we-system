import { request } from 'umi';
import { getListAPIParams } from './data.d';

export const getList = async (params: getListAPIParams) => {
  return request('/api/attendance', { params });
};
