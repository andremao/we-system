import { request } from 'umi';

import { SearchParams } from './data.d';

export const getMemberList = async (params: SearchParams) => {
  const reqParams = { ...params, departmentId: '' };

  if (reqParams.department && reqParams.department.length) {
    reqParams.departmentId = reqParams.department[reqParams.department.length - 1];
    delete reqParams.department;
  }

  return request('/api/member/list', { params: reqParams });
};
