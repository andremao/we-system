import { request } from 'umi';
import { pagingQueryAPIParams, TableRecord } from './data.d';

export const pagingQuery = async (params: pagingQueryAPIParams) => {
  return request('/api/approval/paging', {
    params,
  });
};

export const create = async (params: TableRecord): Promise<{ status: number }> => {
  const { ...restParams } = params;
  return request('/api/approval', {
    method: 'POST',
    data: restParams,
  });
};

export const update = async (params: TableRecord): Promise<{ status: number }> => {
  const { id, ...restParams } = params;
  return request(`/api/approval/${id}`, {
    method: 'PUT',
    data: restParams,
  });
};

export const remove = async (ids: string[]): Promise<{ status: number }> => {
  return request('/api/approval', {
    method: 'DELETE',
    data: { ids },
  });
};
