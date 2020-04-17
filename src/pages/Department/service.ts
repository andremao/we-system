import request from 'umi-request';
import { RequestConfig } from 'umi';
import { TableListParams } from './data.d';

export async function queryDepartment(params?: TableListParams) {
  return request('/api/department', {
    params,
  } as RequestConfig);
}

export async function removeDepartment(params: { id: number[] }) {
  return request('/api/department', {
    method: 'DELETE',
    data: params,
  } as RequestConfig);
}

export async function addDepartment(params: TableListParams) {
  return request('/api/department', {
    method: 'POST',
    data: params,
  } as RequestConfig);
}

export async function updateDepartment(params: TableListParams) {
  return request('/api/department', {
    method: 'PUT',
    data: params,
  } as RequestConfig);
}
