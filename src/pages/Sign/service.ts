import { request } from 'umi';
import { pagingQueryAPIParams } from './data.d';

export const pagingQuery = async (params: pagingQueryAPIParams) => {
  return request('/api/sign/paging', {
    params,
  });
};
