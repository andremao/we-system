/* eslint-disable consistent-return */
import { delay } from '@/utils/utils';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Dropdown, Menu, message } from 'antd';
import React, { useRef, useState } from 'react';
import CreateModal from './components/CreateModal';
import RightsTreeSelect from './components/RightsTreeSelect';
import UpdateModal from './components/UpdateModal';
import { CreateFormVals, getListAPIParams, TableRecordVO, UpdateFormVals } from './data.d';
import { batchRemove, create, getList, update } from './service';

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

  const columns: ProColumns<TableRecordVO>[] = [
    { title: '权限名称', dataIndex: 'name' },
    {
      title: '上级权限名称',
      dataIndex: ['parent', 'name'],
      hideInSearch: true,
      renderText: (text) => text || '无',
    },
    {
      title: '上级权限',
      dataIndex: 'pid',
      hideInTable: true,
      renderFormItem: () => {
        return <RightsTreeSelect />;
      },
    },
    { title: '创建时间', dataIndex: 'created_at', hideInSearch: true, width: 180 },
    {
      title: '操作',
      width: 150,
      fixed: 'right',
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
                        return message.error('删除失败请重试');
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
        // eslint-disable-next-line consistent-return
        onOk={async (formVals: CreateFormVals) => {
          console.log('formVals', formVals);

          setStateOfCreateModal({ ...stateOfCreateModal, confirmLoading: true });
          const { status } = await create({ ...formVals });
          await delay(300);
          setStateOfCreateModal({ ...stateOfCreateModal, confirmLoading: false, visible: false });
          if (status !== 200) return message.error('创建失败请重试');
          message.success('创建成功');
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
          const { status } = await update(formVals);
          await delay(300);
          setStateOfUpdateModal({ ...stateOfUpdateModal, confirmLoading: false, visible: false });
          if (status !== 200) return message.error('更新失败请重试');
          message.success('更新成功');
          if (actionRefOfProTable.current) actionRefOfProTable.current.reload();
        }}
      />
    </PageHeaderWrapper>
  );
};
