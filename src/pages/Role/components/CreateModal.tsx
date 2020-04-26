import RightsTreeSelect from '@/pages/Rights/components/RightsTreeSelect';
import { Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { CreateFormVals } from '../data.d';
import { delay } from '@/utils/utils';

interface Props {
  visible: boolean;
  confirmLoading?: boolean;
  onOk?: (formVals: CreateFormVals) => void;
  onCancel?: () => void;
}

const CreateModal: React.FC<Props> = ({ onOk, ...restProps }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!restProps.visible) {
      (async () => {
        await delay(100);
        form.resetFields();
      })();
    }
  }, [restProps.visible]);

  return (
    <Modal
      title="创建角色"
      {...restProps}
      onOk={async () => {
        const fields = (await form.validateFields()) as CreateFormVals;
        if (onOk) onOk(fields);
      }}
    >
      <Form form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 13 }}>
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

export default CreateModal;
