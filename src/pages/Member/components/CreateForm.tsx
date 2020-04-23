import React from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { CreateParams } from '../data';
import DepartmentCascader from '@/pages/Department/components/DepartmentCascader';

interface CreateFormProps {
  visible: boolean;
  onSubmit: (fieldsValue: CreateParams) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { visible, onSubmit, onCancel } = props;
  return (
    <Modal
      destroyOnClose
      title="添加成员"
      visible={visible}
      onOk={async () => {
        const fields = await form.validateFields();
        form.resetFields();
        onSubmit(fields);
      }}
      onCancel={() => onCancel()}
    >
      <Form form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
        <Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名！' }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="所属部门"
          name="departmentId"
          rules={[{ required: true, message: '请选择所属部门！' }]}
        >
          <DepartmentCascader
            onChange={({ theEndId }) => {
              form.setFieldsValue({ departmentId: theEndId });
            }}
          />
        </Form.Item>
        <Form.Item
          label="职位"
          name="position"
          rules={[{ required: true, message: '请输入职位！' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="roleIds"
          label="角色"
          rules={[{ required: true, message: '请选择角色！' }]}
        >
          <Select mode="multiple" style={{ width: '100%' }} placeholder="请选择" allowClear>
            {[
              { id: '1', name: '大佬' },
              { id: '2', name: '总裁' },
              { id: '3', name: '搬砖工' },
              { id: '4', name: '码农' },
              { id: '5', name: '码畜' },
              { id: '6', name: '码夫' },
            ].map((v) => (
              <Select.Option key={v.id} value={v.id}>
                {v.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="jobNumber"
          label="工号"
          rules={[{ required: true, message: '请输入工号！' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="mobile" label="手机" rules={[{ required: true, message: '请输入手机！' }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱！' }]}>
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;
