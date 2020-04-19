import React, { useState } from 'react';
import { Form, Button, Input, Modal, Select } from 'antd';
import { useRequest } from 'umi';

import { TableListItem } from '../data.d';

import DepartmentCascader from './DepartmentCascader';

import { getDepartmentManagerList } from '../service';

export interface FormValueType extends Partial<TableListItem> {}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

export interface UpdateFormState {
  formVals: FormValueType;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    id: props.values.id,
    name: props.values.name,
    pid: props.values.pid,
    manager: props.values.manager,
    desc: props.values.desc,
    status: props.values.status,
  });

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    console.log(formVals, 'formVals');
    console.log(fieldsValue, 'fieldsValue');
    console.log({ ...formVals, ...fieldsValue }, '{ ...formVals, ...fieldsValue }');

    setFormVals({ ...formVals, ...fieldsValue });

    console.log(formVals, 'formVals222');

    handleUpdate(formVals);
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          完成
        </Button>
      </>
    );
  };

  const { data: managerList = [] } = useRequest(getDepartmentManagerList);

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title={`${formVals.name}·部门配置-${formVals.pid}`}
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Form {...formLayout} form={form} initialValues={formVals}>
        <FormItem
          name="name"
          label="部门名称"
          rules={[{ required: true, message: '请输入部门名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name={['manager', 'id']} label="部门主管">
          <Select style={{ width: '100%' }} placeholder="请选择">
            {managerList.map((v) => (
              <Option value={v.id} key={v.id}>
                {v.name}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem name="pid" label="上级部门">
          <DepartmentCascader defaultValue={values.pids} />
        </FormItem>
        <FormItem name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}>
          <Select style={{ width: '100%' }} placeholder="请选择">
            <Option value={0}>禁用</Option>
            <Option value={1}>启用</Option>
          </Select>
        </FormItem>
        <FormItem
          name="desc"
          label="描述"
          rules={[{ required: true, message: '请输入至少五个字符的描述！', min: 5 }]}
        >
          <TextArea rows={4} placeholder="请输入至少五个字符" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
