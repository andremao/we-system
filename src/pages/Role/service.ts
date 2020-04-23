import { request } from 'umi';
import { BatchRemoveAPIParams } from './data.d';

export const getRoleList = async (params: any) => {
  return request('/api/role', { params });
};

export const batchRemove = async (params: BatchRemoveAPIParams) => {
  return request('/api/role', {
    method: 'DELETE',
    params,
  });
};
