export interface TableListItem {
  id: string;
  name: string;
  status: number;
  desc: string;
  createdAt: Date | number;
  pid: string | null;
  manager: { id: string; name: string } | null;
  children?: TableListItem[];
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
  pid?: string;
  status?: nmber;
  pageSize?: number;
  currentPage?: number;
}
