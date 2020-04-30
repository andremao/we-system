import { T_Department, T_Member, T_Role } from '@/utils/mockdb';

export interface TableRecord extends T_Member {
  department?: T_Department;
  roles: T_Role[];
}

export interface pagingQueryAPIParams extends T_Member {
  current: number;
  pageSize: number;
}
