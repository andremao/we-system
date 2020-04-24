import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { getList } from './service';
import { getListAPIParams, TableRecordVO } from './data.d';

const initialColumns: ProColumns<TableRecordVO>[] = [
  { dataIndex: 'dateRange', valueType: 'dateRange', hideInTable: true },
  { title: '部门', dataIndex: 'departmentNname', hideInTable: true },
  { title: '姓名', dataIndex: 'name', fixed: 'left', width: 80 },
  { title: '工号', dataIndex: 'jobNumber', fixed: 'left', width: 64 },
  {
    title: '部门',
    dataIndex: ['department', 'name'],
    hideInSearch: true,
    ellipsis: true,
    fixed: 'left',
    width: 100,
  },
  { title: '职位', dataIndex: 'position', ellipsis: true, fixed: 'left', width: 100 },
];

export default () => {
  const [scroll, setScroll] = useState({});

  const [columns, setColumns] = useState<ProColumns<TableRecordVO>[]>(initialColumns);

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="考勤列表"
        columns={columns}
        scroll={scroll}
        rowKey="id"
        request={(params) => getList(params as getListAPIParams)}
        pagination={{ pageSize: 10 }}
        beforeSearchSubmit={(params) => {
          const { dateRange } = params as { dateRange: string[] };
          if (dateRange) {
            let st = new Date(dateRange[0]).getTime();
            const et = new Date(dateRange[1]).getTime();
            const ary: ProColumns<TableRecordVO>[] = [];
            while (st <= et) {
              const sd = new Date(st);
              const title = `${sd.getFullYear()}-${(sd.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${sd.getDate().toString().padStart(2, '0')}`;
              ary.push({
                title,
                dataIndex: ['attendanceList', ary.length, 'status'],
                hideInSearch: true,
                valueEnum: {
                  1: { text: '正常', status: 'Success' },
                  2: { text: '迟到', status: 'Warning' },
                  3: { text: '缺卡', status: 'Error' },
                },
                filters: undefined,
                width: 104,
              });
              st += 24 * 60 * 60 * 1000;
            }
            setScroll({ x: 400 + ary.length * 100 });
            setColumns([...columns.slice(0, initialColumns.length), ...ary]);
          }
          return params;
        }}
      />
    </PageHeaderWrapper>
  );
};
