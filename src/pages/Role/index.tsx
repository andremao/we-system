/* eslint-disable consistent-return */
import { delay } from '@/utils/utils';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Dropdown, Menu, message } from 'antd';
import React, { useRef, useState } from 'react';
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';
import { CreateFormVals, getListAPIParams, TableRecordVO, UpdateFormVals } from './data.d';
import { batchRemove, getList, update, create } from './service';

interface StateOfCreateModal {
  visible: boolean;
  confirmLoading?: boolean;
}

interface StateOfUpdateModal {
  visible: boolean;
  confirmLoading?: boolean;
  role?: TableRecordVO;
}

export default () => {
  const [stateOfCreateModal, setStateOfCreateModal] = useState<StateOfCreateModal>({
    visible: false,
  });

  const [stateOfUpdateModal, setStateOfUpdateModal] = useState<StateOfUpdateModal>({
    visible: false,
  });

  const columns: ProColumns<TableRecordVO>[] = [
    { title: '角色名称', dataIndex: 'name' },
    {
      title: '权限列表',
      render(_, record) {
        if (!record.rightsList.length) return '无';
        return record.rightsList.map((v) => v.name).join(',');
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
      width: 180,
    },
    {
      title: '操作',
      width: 150,
      valueType: 'option',
      render: (text, record: TableRecordVO) => (
        <>
          <a
            onClick={() => {
              console.log('record', record);

              setStateOfUpdateModal({ ...stateOfUpdateModal, role: record, visible: true });
            }}
          >
            编辑
          </a>
        </>
      ),
    },
  ];

  const actionRefOfProTable = useRef<ActionType>();

  return (
    <PageHeaderWrapper>
      <ProTable<TableRecordVO>
        headerTitle="角色列表"
        actionRef={actionRefOfProTable}
        toolBarRender={(action, { selectedRowKeys }) => [
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setStateOfCreateModal({ ...stateOfCreateModal, visible: true });
            }}
          >
            添加
          </Button>,
          selectedRowKeys && selectedRowKeys.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  // eslint-disable-next-line consistent-return
                  onClick={async ({ key }) => {
                    if (key === 'remove') {
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
        request={(params) => getList(params as getListAPIParams)}
        columns={columns}
        rowKey="id"
        rowSelection={{}}
        pagination={{ pageSize: 10 }}
      />
      <CreateModal
        visible={stateOfCreateModal.visible}
        confirmLoading={stateOfCreateModal.confirmLoading}
        onCancel={() => {
          setStateOfCreateModal({ ...stateOfCreateModal, visible: false });
        }}
        onOk={async (formVals: CreateFormVals) => {
          console.log('formVals', formVals);

          setStateOfCreateModal({ ...stateOfCreateModal, confirmLoading: true });
          const { status, data: role } = await create(formVals);
          console.log(role, 'created role');

          await delay(300);
          if (status !== 200) message.error('创建失败请重试');
          else message.success('创建成功');
          setStateOfCreateModal({ ...stateOfCreateModal, confirmLoading: false, visible: false });
          if (actionRefOfProTable.current) actionRefOfProTable.current.reload();
        }}
      />
      <UpdateModal
        visible={stateOfUpdateModal.visible}
        confirmLoading={stateOfUpdateModal.confirmLoading}
        role={stateOfUpdateModal.role}
        onCancel={() => {
          setStateOfUpdateModal({ ...stateOfUpdateModal, visible: false });
        }}
        onOk={async (formVals: UpdateFormVals) => {
          console.log('formVals', formVals);

          setStateOfUpdateModal({ ...stateOfUpdateModal, confirmLoading: true });
          const { status } = await update(formVals);
          await delay(300);
          if (status !== 200) message.error('更新失败请重试');
          else message.success('更新成功');
          setStateOfUpdateModal({ confirmLoading: false, visible: false });
          if (actionRefOfProTable.current) actionRefOfProTable.current.reload();
        }}
      />
    </PageHeaderWrapper>
  );
};
