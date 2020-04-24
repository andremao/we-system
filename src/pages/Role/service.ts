import { request } from 'umi';
import { BatchRemoveAPIParams, getRoleListAPIParams } from './data.d';

export const getRoleList = async (params: getRoleListAPIParams) => {
  return request('/api/role', { params });
};

export const batchRemove = async (params: BatchRemoveAPIParams) => {
  return request('/api/role', {
    method: 'DELETE',
    params,
  });
};
