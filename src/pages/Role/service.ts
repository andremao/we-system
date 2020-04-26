import { request } from 'umi';
import { BatchRemoveAPIParams, getListAPIParams, UpdateAPIParams, CreateAPIParams } from './data.d';

export const getList = async (params: getListAPIParams) => {
  return request('/api/role', { params });
};

export const create = async (params: CreateAPIParams) => {
  return request('/api/role', { method: 'POST', data: params });
};

export const batchRemove = async (params: BatchRemoveAPIParams) => {
  return request('/api/role', { method: 'DELETE', params });
};

export const update = async (params: UpdateAPIParams) => {
  const { id, ...restParams } = params;
  return request(`/api/role/${id}`, { method: 'PUT', data: restParams });
};
