import React from 'react';
import { Modal, Form, Input } from 'antd';
import { CreateFormVals } from '../data.d';

interface Props {
  visible: boolean;
  confirmLoading?: boolean;
  onOk?: (formVals: CreateFormVals) => void;
  onCancel?: () => void;
}

const CreateModal: React.FC<Props> = ({ onOk, ...restProps }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="创建权限"
      {...restProps}
      onOk={async () => {
        const fields = (await form.validateFields()) as CreateFormVals;
        form.resetFields();
        if (onOk) onOk(fields);
      }}
    >
      <Form form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
        <Form.Item
          label="权限名称"
          name="name"
          rules={[{ required: true, message: '请输入权限名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateModal;
