import React from 'react';
import { Form, Input, Modal } from 'antd';
import { AddParams } from '../data';

const FormItem = Form.Item;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: AddParams) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd(fieldsValue);
  };
  return (
    <Modal
      destroyOnClose
      title="添加成员"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="姓名"
          name="name"
          rules={[{ required: true, message: '请输入姓名！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
