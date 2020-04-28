import { T_Member } from '@/utils/mockdb';
import { request } from 'umi';
import { pagingQueryAPIParams, TableRecord } from './data.d';

export async function pagingQuery(params: pagingQueryAPIParams) {
  return request('/api/member2/paging', {
    params,
  });
}

export const getAllList = async (): Promise<{ status: number; data: T_Member[] }> => {
  return request('/api/member2/all');
};

export const create = async (params: TableRecord): Promise<{ status: number; data: T_Member }> => {
  const { id: _0, department: _1, roles: _2, created_at: _3, ...restParams } = params;
  return request('/api/member2', {
    method: 'POST',
    data: restParams,
  });
};

export const update = async (params: TableRecord): Promise<{ status: number }> => {
  const { id, department: _0, roles: _1, created_at: _2, ...restParams } = params;
  return request(`/api/member2/${id}`, {
    method: 'PUT',
    data: restParams,
  });
};
