import DepartmentCascader from '@/pages/Department2/components/DepartmentCascader';
import RoleCascader from '@/pages/Role/components/RoleCascader';
import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { TableRecord } from '../data';

export interface UpdateModalProps {
  visible: boolean;
  record?: TableRecord;
  onCancel?: () => void;
  onOk?: (vals: TableRecord) => void;
  confirmLoading?: boolean;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ record, onOk, ...restProps }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (record) {
      console.log(record, 'record');

      form.setFieldsValue(record);
    }
  }, [record]);

  return (
    <Modal
      {...restProps}
      title="编辑成员"
      getContainer={false}
      width={650}
      onOk={async () => {
        const vals = (await form.validateFields()) as TableRecord;
        if (onOk) onOk(vals);
      }}
    >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 19 }}>
        <Form.Item name="id" noStyle>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="所属部门" name="department_id">
          <DepartmentCascader />
        </Form.Item>
        <Form.Item label="职位" name="position">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="分配角色" name="role_ids">
          <RoleCascader
            onReset={() => {
              form.setFieldsValue({ role_ids: record?.role_ids });
            }}
          />
        </Form.Item>
        <Form.Item label="工号" name="job_number">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="手机" name="mobile">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="邮箱" name="email">
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
