export interface Role {
  id: string;
  title: string;
  createdAt: number;
}

export interface getRoleListAPIParams {
  current: number;
  pageSize: number;
  name: string;
}

export interface BatchRemoveAPIParams {
  ids: string[];
}
