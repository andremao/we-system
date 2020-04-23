import request from 'umi-request';
import { RequestConfig } from 'umi';
import { TableListParams, UpdateParams } from './data.d';

export async function queryDepartment(params: { pid: string }) {
  return request('/api/department', {
    params,
  } as RequestConfig);
}

export async function removeDepartment(params: { id: string[] }) {
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

export async function updateDepartment(params: UpdateParams) {
  return request('/api/department', {
    method: 'PUT',
    data: params,
  } as RequestConfig);
}

export async function getTreeDepartment() {
  return request('/api/department/tree', {} as RequestConfig);
}

export async function getDepartmentManagerList() {
  return request('/api/department/manager/list', {} as RequestConfig);
}
