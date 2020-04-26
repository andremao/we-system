import { T_Rights, T_Role } from '@/utils/mockdb';

export interface TableRecordVO extends T_Role {
  rightsList: T_Rights[];
}

export interface getListAPIParams {
  current: number;
  pageSize: number;
  name: string;
}

export interface BatchRemoveAPIParams {
  ids: string[];
}

export interface CreateAPIParams {
  name: string;
  rights_ids: string[];
}

export interface UpdateAPIParams {
  id: string;
  name: string;
  rights_ids: string[];
}

export interface CreateFormVals {
  name: string;
  rights_ids: string[];
}

export interface UpdateFormVals {
  id: string;
  name: string;
  rights_ids: string[];
}
