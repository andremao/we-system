import { T_Rights } from '@/utils/mockdb';

export interface TableRecord extends T_Rights {
  parent?: T_Rights;
}

export interface pagingQueryAPIParams extends T_Rights {
  current: number;
  pageSize: number;
}

export interface BatchRemoveAPIParams {
  ids: string[];
}

export interface CreateAPIParams {
  name: string;
  pid: string;
}

export interface UpdateAPIParams {
  id: string;
  name: string;
  pid: string;
}

export interface CreateFormVals {
  name: string;
  pid: string;
}

export interface UpdateFormVals {
  id: string;
  name: string;
  pid: string;
}
