import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import React, { useRef } from 'react';
import { TableRecord } from './data.d';
import { pagingQuery } from './service';

const Department: React.FC<any> = () => {
  const actionRefOfProTable = useRef<ActionType>();

  const columns: ProColumns<TableRecord>[] = [
    { title: '名称', dataIndex: 'name' },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableRecord>
        headerTitle="签到列表"
        actionRef={actionRefOfProTable}
        rowKey="id"
        request={async (params: any) => pagingQuery(params)}
        columns={columns}
        rowSelection={{}}
      />
    </PageHeaderWrapper>
  );
};

export default Department;
