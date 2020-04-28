import { T_Role } from '@/utils/mockdb';
import { request } from 'umi';
import { BatchRemoveAPIParams, CreateAPIParams, getListAPIParams, TableRecordVO } from './data.d';

export const getList = async (params: getListAPIParams) => {
  return request('/api/role', { params });
};

export const getAllList = async (): Promise<{ status: number; data: T_Role[] }> => {
  return request('/api/role/all');
};

export const create = async (params: CreateAPIParams) => {
  return request('/api/role', { method: 'POST', data: params });
};

export const batchRemove = async (params: BatchRemoveAPIParams) => {
  return request('/api/role', { method: 'DELETE', params });
};

export const update = async (params: TableRecordVO) => {
  const { id, rightsList: _0, created_at: _1, ...restParams } = params;
  return request(`/api/role/${id}`, { method: 'PUT', data: restParams });
};
