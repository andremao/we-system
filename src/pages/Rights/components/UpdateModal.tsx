import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { UpdateFormVals, TableRecordVO } from '../data.d';

interface Props {
  visible: boolean;
  confirmLoading?: boolean;
  rights?: TableRecordVO;
  onOk?: (formVals: UpdateFormVals) => void;
  onCancel?: () => void;
}

const UpdateModal: React.FC<Props> = ({ rights, onOk, ...restProps }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (rights) {
      form.setFieldsValue(rights);
    }
  }, [rights]);

  return (
    <Modal
      title="编辑权限"
      {...restProps}
      onOk={async () => {
        const fields = (await form.validateFields()) as UpdateFormVals;
        if (onOk) onOk(fields);
      }}
      getContainer={false}
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

export default UpdateModal;