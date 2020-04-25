import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Dropdown, Menu, message } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { delay } from '@/utils/utils';
import { getList, batchRemove } from './service';
import UpdateModal from './components/UpdateModal';
import CreateModal from './components/CreateModal';
import { UpdateFormVals, CreateFormVals, TableRecordVO, getListAPIParams } from './data.d';

interface StateOfCreateModal {
  visible: boolean;
  confirmLoading?: boolean;
}

interface StateOfUpdateModal {
  visible: boolean;
  confirmLoading?: boolean;
  rights?: TableRecordVO;
}

export default () => {
  const [stateOfCreateModal, setStateOfCreateModal] = useState<StateOfCreateModal>({
    visible: false,
  });

  const [stateOfUpdateModal, setStateOfUpdateModal] = useState<StateOfUpdateModal>({
    visible: false,
  });

  const columns: ProColumns<any>[] = [
    { title: '权限名称', dataIndex: 'name' },
    { title: '创建时间', dataIndex: 'createdAt', hideInSearch: true, width: 180 },
    {
      title: '操作',
      width: 150,
      valueType: 'option',
      render: (text, record: TableRecordVO) => (
        <>
          <a
            onClick={() => {
              console.log('record', record);

              setStateOfUpdateModal({ ...stateOfUpdateModal, rights: record, visible: true });
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
        headerTitle="权限列表"
        actionRef={actionRefOfProTable}
        request={(params) => getList(params as getListAPIParams)}
        columns={columns}
        rowKey="id"
        rowSelection={{}}
        pagination={{ pageSize: 10 }}
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
          await delay(300);
          message.success('创建成功');
          setStateOfCreateModal({ ...stateOfCreateModal, confirmLoading: false, visible: false });
          if (actionRefOfProTable.current) actionRefOfProTable.current.reload();
        }}
      />
      <UpdateModal
        visible={stateOfUpdateModal.visible}
        confirmLoading={stateOfUpdateModal.confirmLoading}
        rights={stateOfUpdateModal.rights}
        onCancel={() => {
          setStateOfUpdateModal({ ...stateOfUpdateModal, visible: false });
        }}
        onOk={async (formVals: UpdateFormVals) => {
          console.log('formVals', formVals);

          setStateOfUpdateModal({ ...stateOfUpdateModal, confirmLoading: true });
          await delay(300);
          message.success('更新成功');
          setStateOfUpdateModal({ ...stateOfUpdateModal, confirmLoading: false, visible: false });
          if (actionRefOfProTable.current) actionRefOfProTable.current.reload();
        }}
      />
    </PageHeaderWrapper>
  );
};
