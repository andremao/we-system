import React, { useState } from 'react';
import { Form, Button, Input, Modal } from 'antd';

import { UpdateParams, TableListItem } from '../data.d';

export interface UpdateFormProps {
  onCancel: (visible?: boolean, formVals?: UpdateParams) => void;
  onSubmit: (values: UpdateParams) => void;
  visible: boolean;
  values: TableListItem;
}
export interface UpdateFormState {
  formVals: UpdateParams;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { onSubmit, onCancel, visible, values } = props;

  const {
    department: { id: departmentId },
    createdAt: xxx1,
    ...initialFormVals
  } = values;

  const [formVals, setFormVals] = useState<UpdateParams>({ ...initialFormVals, departmentId });

  const [form] = Form.useForm();

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => onCancel(false, values)}>取消</Button>
        <Button
          type="primary"
          onClick={async () => {
            const validateFields = await form.validateFields();
            onSubmit({ ...formVals, ...validateFields });
          }}
        >
          完成
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="编辑成员"
      visible={visible}
      footer={renderFooter()}
      onCancel={() => onCancel(false, values)}
      afterClose={() => onCancel()}
    >
      <Form {...formLayout} form={form} initialValues={formVals}>
        <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名！' }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="departmentId"
          label="所属部门"
          rules={[{ required: true, message: '请选择部门！' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="position"
          label="职位"
          rules={[{ required: true, message: '请输入职位！' }]}
        >
          <Input placeholder="请输入" />
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

export default UpdateForm;
