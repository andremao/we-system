import { T_Department, T_Member } from '@/utils/mockdb';

export interface TableRecord extends T_Department {
  manager?: T_Member;
  memberIds?: string;
  parent?: T_Department;
}

export interface pagingQueryAPIParams {
  current: number;
  pageSize: number;
  name?: string;
  pid?: string;
  manager_id?: string;
}
