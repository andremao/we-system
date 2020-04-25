export interface Rights {
  id: string;
  name: string;
  pid: string;
  createdAt: string;
}

export interface TreeItem extends Rights {
  key: string;
  children: Rights[];
}

export interface TableRecordVO extends Rights {
  parent: TableRecordVO | undefined;
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
