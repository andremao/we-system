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
