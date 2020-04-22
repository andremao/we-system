import request from 'umi-request';
import { TableListSearchParams, UpdateParams, DeleteParams, AddParams } from './data.d';

export async function getMemberList(params?: TableListSearchParams) {
  return request('/api/member/list', {
    params,
  });
}

export async function deleteMember(params: DeleteParams) {
  return request('/api/member', {
    method: 'DELETE',
    data: params,
  });
}

export async function addMember(params: AddParams) {
  return request('/api/member', {
    method: 'POST',
    data: params,
  });
}

export async function updateMember(params: UpdateParams) {
  return request(`/api/member/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
