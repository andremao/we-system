import { T_Approval } from '@/utils/mockdb';

export interface TableRecord extends T_Approval {}

export interface pagingQueryAPIParams {
  current: number;
  pageSize: number;
  name?: string;
}
