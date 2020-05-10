import { BarsOutlined, DeploymentUnitOutlined, FormOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Tabs } from 'antd';
import React from 'react';
import { TableRecord } from '../data.d';
import FlowGraph from './FlowGraph';

export interface CreateModalProps {
  visible: boolean;
  confirmLoading?: boolean;
  onCancel?: () => void;
  onOk?: (formVal: TableRecord) => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ onOk, ...restProps }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="添加审核流程模板"
      width={1024}
      {...restProps}
      onOk={async () => {
        const fields = (await form.validateFields()) as TableRecord;
        if (onOk) onOk(fields);
      }}
    >
      <Tabs defaultActiveKey="1" style={{ marginTop: '-20px' }}>
        <Tabs.TabPane
          tab={
            <span>
              <BarsOutlined />
              基本信息
            </span>
          }
          key="1"
        >
          <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
            <Form.Item
              label="模板编号"
              name="code"
              rules={[{ required: true, message: '请输入模板编号' }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              label="模板名称"
              name="name"
              rules={[{ required: true, message: '请输入模板名称' }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <DeploymentUnitOutlined />
              流程图
            </span>
          }
          key="2"
        >
          <FlowGraph />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FormOutlined />
              流程表单
            </span>
          }
          key="3"
        >
          form
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

export default CreateModal;
