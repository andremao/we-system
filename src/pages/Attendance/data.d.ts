interface Attendance {
  id: string;
  memberId: string;
  date: number;
  status: string;
}

interface AttendanceVO {
  date: string;
  status: number; // 1: 正常, 2: 迟到, 3: 缺卡
}

interface DepartmentVO {
  id: string;
  name: string;
}

export interface TableRecordVO {
  id: string;
  name: string;
  jobNumber: string;
  depatment: DepartmentVO;
  position: string;
  attendanceList: AttendanceVO[];
}

export interface getListAPIParams {
  current: number;
  pageSize: number;
  name: string;
  departmentId: string;
  dateRange: string[];
}
