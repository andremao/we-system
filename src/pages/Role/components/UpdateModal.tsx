import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { UpdateFormVals, TableRecordVO } from '../data.d';

interface Props {
  visible: boolean;
  confirmLoading?: boolean;
  role?: TableRecordVO;
  onOk?: (formVals: UpdateFormVals) => void;
  onCancel?: () => void;
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
          name="name"
          rules={[{ required: true, message: '请输入角色名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
