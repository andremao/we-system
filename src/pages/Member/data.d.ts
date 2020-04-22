export interface TableListItem {
  id: string;
  avatar: string;
  name: string;
  department: { id: string; name: string };
  roles: Object[];
  position: string;
  jobNumber: string;
  mobile: string;
  email: string;
  createdAt: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListSearchParams {
  id?: string;
  name?: string;
  pageSize?: number;
  currentPage?: number;
}

export interface CreateParams {
  avatar: string;
  name: string;
  departmentId: string;
  position: string;
  roleIds: string[];
  jobNumber: string;
  mobile: string;
  email: string;
}

export interface RemoveParams {
  ids: string[];
}

export interface UpdateParams {
  id?: string;
  avatar?: string;
  name?: string;
  departmentId?: string;
  position?: string;
  roleIds?: string[];
  jobNumber?: string;
  mobile?: string;
  email?: string;
}
