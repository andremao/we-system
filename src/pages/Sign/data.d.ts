import { T_Sign } from '@/utils/mockdb';

export interface TableRecord extends T_Sign {}

export interface pagingQueryAPIParams {
  current: number;
  pageSize: number;
  name?: string;
}
