import { request } from 'umi';
import { pagingQueryAPIParams } from './data.d';

export async function pagingQuery(params: pagingQueryAPIParams) {
  return request('/api/member2/paging', {
    params,
  });
}
