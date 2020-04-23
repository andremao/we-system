import React, { useState } from 'react';
import { Form, Button, Input, Modal, Select } from 'antd';
import { useRequest } from 'umi';
import DepartmentCascader from './DepartmentCascader';
import { getDepartmentManagerList } from '../service';
import { TableListItem, UpdateParams } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {}

export interface UpdateFormProps {
  onCancel: (visible?: boolean, formVals?: UpdateParams) => void;
  onSubmit: (values: UpdateParams) => void;
  updateModalVisible: boolean;
  // department: Partial<TableListItem>;
  department: TableListItem;
}
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

export interface UpdateFormState {
  formVals: UpdateParams;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { onSubmit, onCancel: handleUpdateModalVisible, updateModalVisible, department } = props;

  const { manager, children: xxx2, createdAt: xxx3, pids, ...initialFormVals } = department;

  const [formVals, setFormVals] = useState<UpdateParams>({
    ...initialFormVals,
    managerId: manager ? manager.id : null,
  });

  const [form] = Form.useForm();

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, formVals)}>取消</Button>
        <Button
          type="primary"
          onClick={async () => {
            const fieldsValue = await form.validateFields();
            onSubmit({ ...formVals, ...fieldsValue });
          }}
        >
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
      title="部门配置"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, formVals)}
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
        <FormItem name="managerId" label="部门主管">
          <Select style={{ width: '100%' }} placeholder="请选择">
            {managerList.map((v) => (
              <Option value={v.id} key={v.id}>
                {v.name}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="上级部门">
          <DepartmentCascader
            ids={pids}
            onChange={({ theEndId }) => {
              setFormVals({ ...formVals, pid: theEndId });
            }}
          />
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
