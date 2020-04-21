import React from 'react';
import { useRequest } from 'umi';
import { Cascader } from 'antd';
import { getTreeDepartment } from '../service';

interface DepartmentCascaderProps {
  onChange?: () => void;
  value?: string[];
}

const DepartmentCascader: React.FC<DepartmentCascaderProps> = ({ onChange, value }) => {
  const { data: treeDepartment } = useRequest(getTreeDepartment);

  const filter = (inputValue, data) => {
    return data.some((v) => v.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  };

  return (
    <Cascader
      value={value}
      options={treeDepartment}
      expandTrigger="hover"
      fieldNames={{ label: 'name', value: 'id' }}
      showSearch={{ filter }}
      changeOnSelect
      onChange={onChange}
    />
  );
};

export default DepartmentCascader;
