import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Divider, Button, Dropdown, Menu, message } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { delay } from '@/utils/utils';
import { getRoleList, batchRemove } from './service';

const columns: ProColumns<any>[] = [
  { title: '名称', dataIndex: 'title' },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 200,
  },
  {
    title: '操作',
    width: 200,
    valueType: 'option',
    render: (text, record) => (
      <>
        <a onClick={() => {}}>编辑</a>
        <Divider type="vertical" />
        <a onClick={() => {}}>xx操作</a>
      </>
    ),
  },
];

export default () => {
  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="角色列表"
        toolBarRender={(action, { selectedRowKeys }) => [
          <Button icon={<PlusOutlined />} type="primary" onClick={() => {}}>
            添加
          </Button>,
          selectedRowKeys && selectedRowKeys.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      const hide = message.loading('正在删除');
                      const { status } = await batchRemove({ ids: selectedRowKeys as string[] });
                      await delay(300);
                      hide();
                      if (status !== 200) {
                        return message.error('删除失败，请重试');
                      }
                      message.success('删除成功');
                      await action.reload();
                    }
                  }}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="xx">批量xx</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        request={(params) => getRoleList(params)}
        columns={columns}
        rowKey="id"
        rowSelection={{}}
        pagination={{ pageSize: 10 }}
      />
    </PageHeaderWrapper>
  );
};
