import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { Card, Button, Form, Input, Table, Divider, Tooltip, Dropdown, Menu, message } from 'antd';
import { ReloadOutlined, DownOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import { getMemberList } from './service';
import { delay } from '../../utils/utils';
import DepartmentCascader from '../../pages/Department/components/DepartmentCascader';

export default () => {
  const [form] = Form.useForm();

  const onValuesChange = () => {};

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const columns = [
    { title: '姓名', dataIndex: 'name' },
    { title: '所属部门', dataIndex: ['department', 'name'] },
    { title: '职位', dataIndex: 'position' },
    { title: '工号', dataIndex: 'jobNumber' },
    { title: '手机', dataIndex: 'mobile' },
    { title: '邮箱', dataIndex: 'address' },
    {
      title: '操作',
      render(text, record, index) {
        return (
          <div>
            <Button type="link">编辑</Button>
          </div>
        );
      },
    },
  ];

  const searchParamsInitialValues = { name: '', department: [], jobNumber: '', mobile: '' };

  const [searchParams, setSearchParams] = useState(searchParamsInitialValues);

  const { data, loading, refresh } = useRequest(() => getMemberList(searchParams));

  const resetSearch = async () => {
    setSearchParams(searchParamsInitialValues);
    await delay(0);
    refresh();
  };

  const batchDelete = () => {
    message.info('Click on menu item.');
    console.log(selectedRowKeys, 'delete ids');
  };

  const dropdownMenu = (
    <Menu onClick={batchDelete}>
      <Menu.Item>
        <DeleteOutlined />
        删除
      </Menu.Item>
    </Menu>
  );

  return (
    <PageHeaderWrapper>
      <div>
        <Card>
          <Form
            layout="inline"
            form={form}
            initialValues={{}}
            onValuesChange={onValuesChange}
            style={{ justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex' }}>
              <Form.Item label="成员姓名">
                <Input
                  placeholder="请输入"
                  value={searchParams.name}
                  onChange={(e) => setSearchParams({ ...searchParams, name: e.target.value })}
                  allowClear
                />
              </Form.Item>
              <Form.Item label="所属部门">
                <DepartmentCascader
                  value={searchParams.department}
                  onChange={(v) =>
                    setSearchParams({
                      ...searchParams,
                      department: v,
                    })
                  }
                />
              </Form.Item>
              <Form.Item label="工号">
                <Input
                  placeholder="请输入"
                  value={searchParams.jobNumber}
                  onChange={(e) => setSearchParams({ ...searchParams, jobNumber: e.target.value })}
                  allowClear
                />
              </Form.Item>
              <Form.Item label="手机号码">
                <Input
                  placeholder="请输入"
                  value={searchParams.mobile}
                  onChange={(e) => setSearchParams({ ...searchParams, mobile: e.target.value })}
                  allowClear
                />
              </Form.Item>
            </div>
            <Form.Item style={{ marginRight: 0 }}>
              <Button type="primary" style={{ marginRight: '8px' }} onClick={refresh}>
                查询
              </Button>
              <Button htmlType="button" onClick={resetSearch}>
                重置
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ fontSize: '16px' }}>成员列表</div>
            <div>
              <Button type="primary" style={{ marginRight: '8px' }}>
                添加成员
              </Button>
              {selectedRowKeys.length ? (
                <Dropdown overlay={dropdownMenu}>
                  <Button>
                    批量操作 <DownOutlined />
                  </Button>
                </Dropdown>
              ) : null}
              <Divider type="vertical" style={{ margin: '0 16px' }} />
              <Tooltip title="刷新">
                <ReloadOutlined style={{ cursor: 'pointer' }} onClick={refresh} />
              </Tooltip>
            </div>
          </div>
          <Table
            loading={loading}
            size="middle"
            rowKey="id"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </Card>
      </div>
    </PageHeaderWrapper>
  );
};
