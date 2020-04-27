import { T_Department } from '@/utils/mockdb';
import { request } from 'umi';
import { pagingQueryAPIParams, TableRecord } from './data.d';

export const pagingQuery = async (params: pagingQueryAPIParams) => {
  return request('/api/department2/paging', {
    params,
  });
};

export const update = async (params: TableRecord): Promise<{ status: number }> => {
  const { id, ...restParams } = params;
  return request(`/api/department2/${id}`, {
    method: 'PUT',
    data: restParams,
  });
};

export const getTree = async (): Promise<{ status: number; tree: T_Department[] }> => {
  return request('/api/department2/tree');
};

export const getIdPathAry = async (id: string): Promise<{ status: number; data: string[] }> => {
  return request(`/api/department2/${id}/path-ary`);
};
