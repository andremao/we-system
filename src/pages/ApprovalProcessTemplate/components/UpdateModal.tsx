import { Divider, Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { TableRecord } from '../data.d';
import FlowForm from './FlowForm';
import FlowGraph from './FlowGraph';

const { log } = console;

export interface UpdateModalProps {
  visible: boolean;
  record?: TableRecord;
  confirmLoading?: boolean;
  onCancel?: () => void;
  onOk?: (formVal: TableRecord) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ record, onOk, ...resetProps }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    log(record);
    if (record) {
      setTimeout(() => {
        form.setFieldsValue(record);
      }, 0);
    }
  }, [record]);

  return (
    <Modal
      title="审批流程模板编辑"
      width={1024}
      onOk={async () => {
        const fields = (await form.validateFields()) as TableRecord;
        if (onOk) onOk(fields);
      }}
      {...resetProps}
    >
      <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
        <Form.Item name="id" noStyle>
          <Input type="hidden" />
        </Form.Item>
        <Divider orientation="left">基本信息</Divider>
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
        <Divider orientation="left">流程图</Divider>
        <Form.Item
          label=""
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          name="flow_graph_data"
          trigger="onSave"
          valuePropName="data"
        >
          <FlowGraph />
        </Form.Item>
        <Divider orientation="left">流程表单</Divider>
        <Form.Item
          label=""
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          name="flow_form_data"
          trigger="onSave"
          valuePropName="data"
        >
          <FlowForm />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
