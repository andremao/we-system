import RightsTreeSelect from '@/pages/Rights/components/RightsTreeSelect';
import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { TableRecordVO, UpdateFormVals } from '../data.d';

interface Props {
  visible: boolean;
  confirmLoading?: boolean;
  role?: TableRecordVO;
  onOk?: (formVals: UpdateFormVals) => void;
  onCancel?: () => void;
}

const UpdateModal: React.FC<Props> = ({ role, onOk, ...restProps }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (role) {
      form.setFieldsValue({
        id: role.id,
        name: role.name,
        rights_ids: role.rightsList.map((v) => v.id),
      });
    }
  }, [role]);

  return (
    <Modal
      title="编辑角色"
      {...restProps}
      onOk={async () => {
        const fields = (await form.validateFields()) as UpdateFormVals;
        if (onOk) onOk(fields);
      }}
      getContainer={false}
    >
      <Form form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
        <Form.Item name="id" noStyle>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item
          label="角色名称"
          name="name"
          rules={[{ required: true, message: '请输入角色名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="分配权限" name="rights_ids">
          <RightsTreeSelect treeCheckable />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
