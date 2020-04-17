import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Select, Steps } from 'antd';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    name: props.values.name,
    status: props.values.status,
    desc: props.values.desc,
    key: props.values.key,
    target: '0',
    template: '0',
    type: '1',
    time: '',
    frequency: 'month',
  });

  const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 2) {
      forward();
    } else {
      handleUpdate(formVals);
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <FormItem name="managerId" label="指定主管">
            <Select style={{ width: '100%' }}>
              <Option value="month">月</Option>
              <Option value="week">周</Option>
            </Select>
          </FormItem>
          <FormItem name="parentId" label="指定上级部门">
            <Select style={{ width: '100%' }}>
              <Option value="month">月</Option>
              <Option value="week">周</Option>
            </Select>
          </FormItem>
          <FormItem name="children" label="分配子部门">
            <Select style={{ width: '100%' }}>
              <Option value="month">月</Option>
              <Option value="week">周</Option>
            </Select>
          </FormItem>
        </>
      );
    }
    return (
      <>
        <FormItem
          name="name"
          label="部门名称"
          rules={[{ required: true, message: '请输入部门名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}>
          <Select style={{ width: '100%' }}>
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
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            上一步
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleNext()}>
            完成
          </Button>
        </>
      );
    }
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          下一步
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="部门配置"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Steps style={{ marginBottom: 28, width: '50%' }} size="small" current={currentStep}>
          <Step title="基本信息" />
          <Step title="组织结构" />
        </Steps>
      </div>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          target: formVals.target,
          template: formVals.template,
          type: formVals.type,
          frequency: formVals.frequency,
          name: formVals.name,
          status: formVals.status,
          desc: formVals.desc,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
