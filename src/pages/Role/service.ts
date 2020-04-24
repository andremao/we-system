import { request } from 'umi';
import { BatchRemoveAPIParams, getListAPIParams } from './data.d';

export const getList = async (params: getListAPIParams) => {
  return request('/api/role', { params });
};

export const batchRemove = async (params: BatchRemoveAPIParams) => {
  return request('/api/role', {
    method: 'DELETE',
    params,
  });
};
