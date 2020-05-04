import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { TableRecord } from '../data.d';

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
    if (record) {
      form.setFieldsValue(record);
    }
  }, [record]);

  return (
    <Modal
      title="审批流程模板编辑"
      width={800}
      {...resetProps}
      onOk={async () => {
        const fields = (await form.validateFields()) as TableRecord;
        if (onOk) onOk(fields);
      }}
      getContainer={false}
    >
      <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
        <Form.Item name="id" noStyle>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item
          label="模板名称"
          name="name"
          rules={[{ required: true, message: '请输入模板名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
