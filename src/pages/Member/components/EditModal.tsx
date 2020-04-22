import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import DepartmentCascader from '@/pages/Department/components/DepartmentCascader';
import { getDepartmentPIds } from '@/pages/Department/service';

const EditModal = ({ visible, loading, handleOk, handleCancel, formData }) => {
  const [pids, setPids] = useState<string[]>([]);
  useEffect(() => {
    if (formData.department) {
      (async () => {
        const { data } = await getDepartmentPIds({ pid: formData.department.id });
        setPids(data);
      })();
    }
  }, [formData.department]);

  const onOk = () => {
    console.log(formData, 'formData');
    handleOk(formData);
  };

  const [form] = Form.useForm();

  return (
    <div>
      <Modal
        visible={visible}
        title="编辑"
        onOk={onOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={onOk}>
            提交
          </Button>,
        ]}
      >
        <Form labelCol={{ span: 4 }} initialValues={formData} form={form}>
          <Form.Item label="姓名" name="name">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="所属部门">
            <DepartmentCascader value={pids} onChange={setPids} />
          </Form.Item>
          <Form.Item label="职位" name="position">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="工号" name="jobNumber">
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
    </div>
  );
};

export default EditModal;
