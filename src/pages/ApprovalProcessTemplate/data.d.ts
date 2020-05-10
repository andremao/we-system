import { T_ApprovalProcessTemplate } from '@/utils/mockdb';

export interface TableRecord extends T_ApprovalProcessTemplate {}

export interface pagingQueryAPIParams {
  current: number;
  pageSize: number;
  code?: string;
  name?: string;
}
