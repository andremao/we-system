import { request } from 'umi';
import { pagingQueryAPIParams, TableRecord } from './data.d';

export async function pagingQuery(params: pagingQueryAPIParams) {
  return request('/api/member2/paging', {
    params,
  });
}

export const update = async (params: TableRecord): Promise<{ status: number }> => {
  const { id, department: _0, roles: _1, created_at: _2, ...restParams } = params;
  return request(`/api/member2/${id}`, {
    method: 'PUT',
    data: restParams,
  });
};
