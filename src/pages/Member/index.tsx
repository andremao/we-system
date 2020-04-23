import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { TableListItem, UpdateParams } from './data.d';
import { getMemberList, updateMember, createMember, removeMember } from './service';
import DepartmentCascader from '../Department/components/DepartmentCascader';

const TableList: React.FC<{}> = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [updateItem, setUpdateItem] = useState<TableListItem>({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      renderText: ({ name }) => name,
      renderFormItem: () => <DepartmentCascader />,
    },
    {
      title: '职位',
      dataIndex: 'position',
    },
    {
      title: '角色',
      dataIndex: ['roles', 'id'],
      renderText(_, record) {
        return record.roles.map((v) => v.name).join(',');
      },
    },
    {
      title: '工号',
      dataIndex: 'jobNumber',
    },
    {
      title: '手机',
      dataIndex: 'mobile',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '添加时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setUpdateModalVisible(true);
              setUpdateItem(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a href="">xx操作</a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="成员列表"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setCreateModalVisible(true)}
          >
            添加
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'delete') {
                      const hide = message.loading('正在删除');
                      const { status } = await removeMember({
                        ids: selectedRows.map((row) => row.id),
                      });
                      hide();
                      if (status !== 200) {
                        return message.error('删除失败，请重试');
                      }
                      message.success('删除成功，即将刷新');
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="delete">批量删除</Menu.Item>
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
        request={(params) => getMemberList(params)}
        columns={columns}
        rowSelection={{}}
        pagination={{ pageSize: 10 }}
      />
      <CreateForm
        onSubmit={async (formVals) => {
          const hide = message.loading('正在添加');
          const { status } = await createMember(formVals);
          hide();
          if (status !== 200) {
            return message.error('添加失败请重试！');
          }
          message.success('添加成功');
          setCreateModalVisible(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}
        onCancel={() => setCreateModalVisible(false)}
        visible={createModalVisible}
      />
      {updateItem && Object.keys(updateItem).length ? (
        <UpdateForm
          onSubmit={async (formVals: UpdateParams) => {
            const hide = message.loading('正在配置');
            const { status } = await updateMember(formVals);
            hide();
            if (status === 200) {
              message.success('配置成功');
              setUpdateModalVisible(false);
              setUpdateItem({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            } else {
              message.error('配置失败请重试！');
            }
          }}
          onCancel={() => {
            setUpdateModalVisible(false);
            setUpdateItem({});
          }}
          visible={updateModalVisible}
          values={updateItem}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
