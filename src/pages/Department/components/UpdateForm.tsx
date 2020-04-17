import React, { useState } from 'react';
import { Form, Button, Input, Modal, Select, Tabs } from 'antd';

import { TableListItem } from '../data.d';

import DepartmentCascader from './DepartmentCascader';

const { TabPane } = Tabs;

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

    setFormVals({ ...formVals, ...fieldsValue });

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

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title={`${formVals.name}·部门配置`}
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Form {...formLayout} form={form} initialValues={formVals}>
        <Tabs size="large">
          <TabPane tab={<span>基本信息</span>} key="1">
            <FormItem
              name="name"
              label="部门名称"
              rules={[{ required: true, message: '请输入部门名称！' }]}
            >
              <Input placeholder="请输入" />
            </FormItem>
            <FormItem name={['manager', 'id']} label="指定部门主管">
              <Select style={{ width: '100%' }} placeholder="请选择">
                <Option value="1">黎总</Option>
                <Option value="2">张三</Option>
              </Select>
            </FormItem>
            <FormItem
              name="status"
              label="状态"
              rules={[{ required: true, message: '请选择状态' }]}
            >
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
          </TabPane>
          <TabPane tab={<span>组织架构</span>} key="2">
            <FormItem name="parentId" label="指定上级部门">
              <DepartmentCascader />
            </FormItem>
            <FormItem name="children" label="分配子部门">
              <Select style={{ width: '100%' }} placeholder="请选择">
                <Option value="month">月</Option>
                <Option value="week">周</Option>
              </Select>
            </FormItem>
          </TabPane>
        </Tabs>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
