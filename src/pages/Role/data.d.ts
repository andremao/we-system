export interface Role {
  id: string;
  title: string;
  createdAt: number;
}

export interface getRoleListAPIParams {
  current: number;
  pageSize: number;
  title: string;
}

export interface BatchRemoveAPIParams {
  ids: string[];
}

interface CreateFormVals {
  title: string;
}

interface UpdateFormVals {
  title: string;
}
