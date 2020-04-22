export interface TableListItem {
  id: string;
  avatar: string;
  name: string;
  department: { id: string; name: string };
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

export interface AddParams {
  avatar: string;
  name: string;
  departmentId: string;
  position: string;
  jobNumber: string;
  mobile: string;
  email: string;
}

export interface DeleteParams {
  ids: string[];
}

export interface UpdateParams {
  id?: string;
  avatar?: string;
  name?: string;
  departmentId?: string;
  position?: string;
  jobNumber?: string;
  mobile?: string;
  email?: string;
}
