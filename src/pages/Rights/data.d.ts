import { T_Rights } from '@/utils/mockdb';

export interface TableRecordVO extends T_Rights {
  parent?: T_Rights;
}

export interface getListAPIParams {
  current: number;
  pageSize: number;
  name: string;
  pid: string;
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
