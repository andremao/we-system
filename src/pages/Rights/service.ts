import { request } from 'umi';
import { BatchRemoveAPIParams, getListAPIParams, CreateAPIParams, UpdateAPIParams } from './data.d';

export const getList = async (params: getListAPIParams) => {
  return request('/api/rights', { params });
};

export const getTreeList = async () => {
  return request('/api/rights/tree');
};

export const batchRemove = async (params: BatchRemoveAPIParams) => {
  return request('/api/rights', {
    method: 'DELETE',
    params,
  });
};

export const create = async (params: CreateAPIParams) => {
  return request('/api/rights', {
    method: 'POST',
    data: params,
  });
};

export const update = async (params: UpdateAPIParams) => {
  const { id, ...restParams } = params;
  return request(`/api/rights/${id}`, {
    method: 'PUT',
    data: restParams,
  });
};
