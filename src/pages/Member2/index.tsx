import { delay } from '@/utils/utils';
import { DownOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Dropdown, Menu, message } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateModal, { UpdateModalProps } from './components/UpdateModal';
import { TableRecord } from './data.d';
import { pagingQuery, update } from './service';

const Member: React.FC<{}> = () => {
  const actionRefOfProTable = useRef<ActionType>();

  const [updateModalState, setUpdateModalState] = useState<UpdateModalProps>({ visible: false });

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
            <a
              onClick={() => {
                setUpdateModalState((state) => ({ ...state, visible: true, record }));
              }}
            >
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
        actionRef={actionRefOfProTable}
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
      <UpdateModal
        {...updateModalState}
        onOk={async (vals) => {
          console.log(vals, 'vals');

          setUpdateModalState((state) => ({ ...state, confirmLoading: true }));
          await delay(1000);
          const { status } = await update(vals);
          if (status !== 200) message.error('更新失败请重试');
          else message.success('更新成功');
          setUpdateModalState((state) => ({
            ...state,
            visible: false,
            confirmLoading: false,
            record: undefined,
          }));
          if (actionRefOfProTable.current) actionRefOfProTable.current.reload();
        }}
        onCancel={() => {
          setUpdateModalState({ visible: false });
        }}
      />
    </PageHeaderWrapper>
  );
};

export default Member;
