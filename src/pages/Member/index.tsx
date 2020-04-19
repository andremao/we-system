import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Card, Button, Form, Input, Table } from 'antd';

export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  const [form] = Form.useForm();

  const onValuesChange = () => {};

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  return (
    <PageHeaderWrapper>
      {loading ? (
        <div style={{ paddingTop: 100, textAlign: 'center' }}>
          <Spin spinning={loading} size="large" />
        </div>
      ) : (
        <div>
          <Card>
            <Form
              layout="inline"
              form={form}
              initialValues={{}}
              onValuesChange={onValuesChange}
              style={{ justifyContent: 'space-between' }}
            >
              <Form.Item label="成员姓名">
                <Input placeholder="请输入" />
              </Form.Item>
              <Form.Item style={{ marginRight: 0 }}>
                <Button type="primary" style={{ marginRight: '8px' }}>
                  查询
                </Button>
                <Button htmlType="button">重置</Button>
              </Form.Item>
            </Form>
          </Card>
          <Card style={{ marginTop: '24px' }}>
            <Table size="middle" rowSelection={rowSelection} columns={columns} dataSource={data} />
          </Card>
        </div>
      )}
    </PageHeaderWrapper>
  );
};
