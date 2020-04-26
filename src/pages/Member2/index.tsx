import { DownOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Dropdown, Menu } from 'antd';
import React, { useRef } from 'react';
import { TableRecord } from './data.d';
import { pagingQuery } from './service';

const Member: React.FC<any> = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableRecord>[] = [
    { title: '姓名', dataIndex: 'name', width: 80, ellipsis: true },
    {
      title: '所属部门',
      dataIndex: ['department', 'name'],
      width: 100,
      ellipsis: true,
    },
    { title: '职位', dataIndex: 'position', width: 100, ellipsis: true },
    {
      title: '角色',
      renderText(_, { roles }) {
        if (roles && roles.length) {
          return roles.map((v) => v.name).join(',');
        }
        return '无';
      },
      width: 100,
      ellipsis: true,
    },
    { title: '工号', dataIndex: 'job_number', width: 60 },
    { title: '手机', dataIndex: 'mobile', width: 100 },
    { title: '邮箱', dataIndex: 'email', width: 100 },
    {
      title: '添加时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
      ellipsis: true,
      width: 130,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render(_, record) {
        return (
          <>
            <a onClick={() => {}}>
              <EditOutlined />
              &nbsp;编辑
            </a>
          </>
        );
      },
      width: 100,
      align: 'center',
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableRecord>
        headerTitle="成员列表"
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
        request={(params: any) => pagingQuery(params)}
        columns={columns}
        rowSelection={{}}
        pagination={{ pageSize: 10 }}
      />
    </PageHeaderWrapper>
  );
};

export default Member;
