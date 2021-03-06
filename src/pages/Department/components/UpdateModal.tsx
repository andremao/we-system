import MemberCascader from '@/pages/Member/components/MemberCascader';
import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { TableRecord } from '../data.d';
import DepartmentCascader from './DepartmentCascader';

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
      title="部门编辑"
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
          label="部门名称"
          name="name"
          rules={[{ required: true, message: '请输入部门名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="部门主管" name="manager_id">
          <MemberCascader />
        </Form.Item>
        <Form.Item label="部门成员列表" name="memberIds">
          <MemberCascader mode="multiple" />
        </Form.Item>
        <Form.Item label="上级部门" name="pid">
          <DepartmentCascader />
        </Form.Item>
        <Form.Item label="描述" name="description">
          <Input.TextArea rows={4} placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
