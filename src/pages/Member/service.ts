import request from 'umi-request';
import { TableListSearchParams, UpdateParams, RemoveParams, CreateParams } from './data.d';

export async function getMemberList(params?: TableListSearchParams) {
  return request('/api/member/list', {
    params,
  });
}

export async function removeMember(params: RemoveParams) {
  return request('/api/member', {
    method: 'DELETE',
    params,
  });
}

export async function createMember(params: CreateParams) {
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
