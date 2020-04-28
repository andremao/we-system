import { delay } from '@/utils/utils';
import { DownOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useRef, useState } from 'react';
import { Link } from 'umi';
import CreateModal, { CreateModalProps } from './components/CreateModal';
import DepartmentCascader from './components/DepartmentCascader';
import UpdateModal, { UpdateModalProps } from './components/UpdateModal';
import { TableRecord } from './data.d';
import { create, pagingQuery, update } from './service';

const Department: React.FC<any> = () => {
  const actionRefOfProTable = useRef<ActionType>();

  const [createModalState, setCreateModalState] = useState<CreateModalProps>({
    visible: false,
  });

  const [settingModalState, setUpdateModalState] = useState<UpdateModalProps>({
    visible: false,
  });

  const columns: ProColumns<TableRecord>[] = [
    { title: '部门名称', dataIndex: 'name' },
    { title: '部门主管', dataIndex: ['manager', 'name'], renderText: (_) => _ || '-' },
    {
      title: '上级部门',
      dataIndex: ['parent', 'name'],
      renderText: (_) => _ || '-',
      hideInSearch: true,
    },
    {
      title: '上级部门',
      dataIndex: 'pid',
      hideInTable: true,
      renderFormItem(_, config, form) {
        return (
          <DepartmentCascader
            onChange={(pid) => {
              form.setFieldsValue({ pid });
            }}
          />
        );
      },
    },
    { title: '描述', dataIndex: 'description', hideInSearch: true },
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
            <SettingOutlined /> 配置
          </a>
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
        actionRef={actionRefOfProTable}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setCreateModalState((state) => ({ ...state, visible: true }));
            }}
          >
            添加
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      console.log(selectedRows, 'selectedRows');

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
          if (status !== 200) message.error('添加失败请重试');
          else message.success('添加成功');
          setCreateModalState((state) => ({ ...state, confirmLoading: false, visible: false }));
          if (actionRefOfProTable.current) actionRefOfProTable.current.reload();
        }}
      />

      <UpdateModal
        {...settingModalState}
        onCancel={() => {
          setUpdateModalState((state) => ({ ...state, visible: false }));
        }}
        onOk={async (vals) => {
          console.log(vals, 'vals');

          setUpdateModalState((state) => ({ ...state, confirmLoading: true }));
          await delay(1000);
          const { status } = await update(vals);
          if (status !== 200) message.error('配置失败请重试');
          else message.success('配置成功');
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
