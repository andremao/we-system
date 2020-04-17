export interface TableListItem {
  id: number;
  name: string;
  status: number;
  desc: string;
  createdAt: Date | number;
  pid: number | null;
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

export interface TableListParams {
  name?: string;
  pid?: number;
  status?: nmber;
  pageSize?: number;
  currentPage?: number;
}
