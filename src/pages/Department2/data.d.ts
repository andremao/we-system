import { T_Department, T_Member } from '@/utils/mockdb';

export interface TableRecord extends T_Department {
  manager: T_Member;
  parent?: T_Department;
}

export interface pagingQueryAPIParams {
  current: number;
  pageSize: number;
}
