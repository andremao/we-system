import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { getList } from './service';
import { getListAPIParams, TableRecordVO } from './data.d';

export default () => {
  const columns: ProColumns<TableRecordVO>[] = [
    { title: '姓名', dataIndex: 'name' },
    { title: '工号', dataIndex: 'jobNumber' },
    { title: '部门', dataIndex: ['department', 'name'] },
    { title: '职位', dataIndex: 'position' },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="考勤列表"
        columns={columns}
        rowKey="id"
        request={(params) => getList(params as getListAPIParams)}
        pagination={{ pageSize: 10 }}
      />
    </PageHeaderWrapper>
  );
};
