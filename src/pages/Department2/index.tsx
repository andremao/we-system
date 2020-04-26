import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, Dropdown, Menu } from 'antd';
import React, { useRef } from 'react';
import { Link } from 'umi';
import { TableRecord } from './data.d';
import { pagingQuery } from './service';

const Department: React.FC<any> = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableRecord>[] = [
    { title: '部门名称', dataIndex: 'name' },
    { title: '部门主管', dataIndex: ['manager', 'name'] },
    { title: '上级部门', dataIndex: ['parent', 'name'] },
    { title: '描述', dataIndex: 'description', hideInSearch: true },
    { title: '创建时间', dataIndex: 'created_at', valueType: 'dateTime', hideInSearch: true },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => {}}>配置</a>
          <Divider type="vertical" />
          <Link to="/member">成员管理</Link>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableRecord>
        headerTitle="部门列表"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          <Button icon={<PlusOutlined />} type="primary" onClick={() => {}}>
            新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={({ selectedRowKeys }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
          </div>
        )}
        request={(params: any) => pagingQuery(params)}
        columns={columns}
        rowSelection={{}}
        pagination={{ pageSize: 10 }}
      />
    </PageHeaderWrapper>
  );
};

export default Department;
