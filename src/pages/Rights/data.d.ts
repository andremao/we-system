export interface TableRecordVO {
  id: string;
  name: string;
  createdAt: string;
}

export interface getListAPIParams {
  current: number;
  pageSize: number;
  name: string;
}

export interface BatchRemoveAPIParams {
  ids: string[];
}

export interface CreateFormVals {
  name: string;
}

export interface UpdateFormVals {
  name: string;
}
