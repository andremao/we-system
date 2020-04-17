import React from 'react';
import { useRequest } from 'umi';
import { Cascader } from 'antd';
import { getTreeDepartment } from '../service';

interface DepartmentCascaderProps {
  onChange?: () => void;
}

const DepartmentCascader: React.FC<DepartmentCascaderProps> = ({ onChange }) => {
  const { data: treeDepartment } = useRequest(getTreeDepartment);

  const filter = (inputValue, data) => {
    return data.some((v) => v.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  };

  return (
    <Cascader
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
