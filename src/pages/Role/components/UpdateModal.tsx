import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { UpdateFormVals, Role } from '../data.d';

interface Props {
  visible: boolean;
  role: Role | null;
  onOk?: (formVals: UpdateFormVals) => void;
  onCancel?: () => void;
  confirmLoading?: boolean;
}

const UpdateModal: React.FC<Props> = ({ role, onOk, ...restProps }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (role) {
      form.setFieldsValue(role);
    }
  }, [role]);

  return (
    <Modal
      title="编辑角色"
      {...restProps}
      onOk={async () => {
        const fields = (await form.validateFields()) as UpdateFormVals;
        if (onOk) onOk(fields);
      }}
      getContainer={false}
    >
      <Form form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
        <Form.Item
          label="角色名称"
          name="title"
          rules={[{ required: true, message: '请输入角色名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
