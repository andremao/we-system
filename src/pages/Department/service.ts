import { T_Department } from '@/utils/mockdb';
import { request } from 'umi';
import { pagingQueryAPIParams, TableRecord } from './data.d';

export const pagingQuery = async (params: pagingQueryAPIParams) => {
  return request('/api/department/paging', {
    params,
  });
};

export const create = async (params: TableRecord): Promise<{ status: number }> => {
  const { id: _0, manager: _1, parent: _2, created_at: _3, ...restParams } = params;
  return request('/api/department', {
    method: 'POST',
    data: restParams,
  });
};

export const update = async (params: TableRecord): Promise<{ status: number }> => {
  const { id, manager: _0, parent: _1, created_at: _2, ...restParams } = params;
  return request(`/api/department/${id}`, {
    method: 'PUT',
    data: restParams,
  });
};

export const remove = async (ids: string[]): Promise<{ status: number }> => {
  return request('/api/department', {
    method: 'DELETE',
    data: { ids },
  });
};

export const getTree = async (): Promise<{ status: number; tree: T_Department[] }> => {
  return request('/api/department/tree');
};

export const getIdPathAry = async (id: string): Promise<{ status: number; data: string[] }> => {
  return request(`/api/department/${id}/path-ary`);
};
