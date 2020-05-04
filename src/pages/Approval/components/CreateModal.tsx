import { delay } from '@/utils/utils';
import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { TableRecord } from '../data.d';

export interface CreateModalProps {
  visible: boolean;
  confirmLoading?: boolean;
  onCancel?: () => void;
  onOk?: (formVal: TableRecord) => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ onOk, ...restProps }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!restProps.visible) {
      delay(100).then(() => {
        form.resetFields();
      });
    }
  }, [restProps.visible]);

  return (
    <Modal
      title="发起审核流程"
      width={800}
      {...restProps}
      onOk={async () => {
        const fields = (await form.validateFields()) as TableRecord;
        if (onOk) onOk(fields);
      }}
      getContainer={false}
    >
      <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
        <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入名称' }]}>
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateModal;
