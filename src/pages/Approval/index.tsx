import { delay } from '@/utils/utils';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Dropdown, Menu, message } from 'antd';
import React, { useRef, useState } from 'react';
import CreateModal, { CreateModalProps } from './components/CreateModal';
import UpdateModal, { UpdateModalProps } from './components/UpdateModal';
import { TableRecord } from './data.d';
import { create, pagingQuery, remove, update } from './service';

const Department: React.FC<any> = () => {
  const actionRefOfProTable = useRef<ActionType>();

  const [createModalState, setCreateModalState] = useState<CreateModalProps>({
    visible: false,
  });

  const [updateModalState, setUpdateModalState] = useState<UpdateModalProps>({
    visible: false,
  });

  const columns: ProColumns<TableRecord>[] = [
    { title: '名称', dataIndex: 'name' },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
      width: 130,
      ellipsis: true,
    },
    {
      title: '操作',
      width: 120,
      align: 'center',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setUpdateModalState((state) => ({ ...state, visible: true, record }));
            }}
          >
            <EditOutlined /> 编辑
          </a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableRecord>
        headerTitle="审批流程列表"
        actionRef={actionRefOfProTable}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          // <Button
          //   icon={<PlusOutlined />}
          //   type="primary"
          //   onClick={() => {
          //     setCreateModalState((state) => ({ ...state, visible: true }));
          //   }}
          // >
          //   发起流程
          // </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      const { status } = await remove(selectedRows.map((v) => v.id));
                      if (status !== 200) message.error('删除失败请重试');
                      else message.success('删除成功，列表将自动刷新');
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
        request={async (params: any) => pagingQuery(params)}
        columns={columns}
        rowSelection={{}}
      />

      <CreateModal
        {...createModalState}
        onCancel={() => {
          setCreateModalState((state) => ({ ...state, visible: false }));
        }}
        onOk={async (vals) => {
          console.log(vals, 'vals');

          setCreateModalState((state) => ({ ...state, confirmLoading: true }));
          await delay(1000);
          const { status } = await create(vals);
          if (status !== 200) message.error('发起失败请重试');
          else message.success('发起成功');
          setCreateModalState((state) => ({ ...state, confirmLoading: false, visible: false }));
          if (actionRefOfProTable.current) actionRefOfProTable.current.reload();
        }}
      />

      <UpdateModal
        {...updateModalState}
        onCancel={() => {
          setUpdateModalState((state) => ({ ...state, visible: false }));
        }}
        onOk={async (vals) => {
          console.log(vals, 'vals');

          setUpdateModalState((state) => ({ ...state, confirmLoading: true }));
          await delay(1000);
          const { status } = await update(vals);
          if (status !== 200) message.error('编辑失败请重试');
          else message.success('编辑成功');
          setUpdateModalState((state) => ({
            ...state,
            visible: false,
            confirmLoading: false,
            record: undefined,
          }));
          if (actionRefOfProTable.current) actionRefOfProTable.current.reload();
        }}
      />
    </PageHeaderWrapper>
  );
};

export default Department;
