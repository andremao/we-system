export interface Rights {
  id: string;
  title: string;
  createdAt: number;
}

export interface getListAPIParams {
  current: number;
  pageSize: number;
  title: string;
}

export interface BatchRemoveAPIParams {
  ids: string[];
}

export interface CreateFormVals {
  title: string;
}

export interface UpdateFormVals {
  title: string;
}
