import React from 'react';
import { useRequest } from 'umi';
import { Cascader } from 'antd';
import { getTreeDepartment } from '../service';

interface DepartmentCascaderProps {
  onChange?: (opts: { ids: string[]; theEndId: string | null }) => void;
  ids?: string[];
}

const DepartmentCascader: React.FC<DepartmentCascaderProps> = ({ onChange, ids }) => {
  const { data: treeDepartment } = useRequest(getTreeDepartment);

  const filter = (inputValue: string, data: any[]) => {
    return data.some((v) => v.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  };

  return (
    <Cascader
      defaultValue={ids}
      options={treeDepartment}
      expandTrigger="hover"
      fieldNames={{ label: 'name', value: 'id' }}
      showSearch={{ filter }}
      changeOnSelect
      onChange={(value) => {
        if (onChange) {
          const theEndId = value.length ? value[value.length - 1] : null;
          onChange({ ids: value, theEndId });
        }
      }}
    />
  );
};

export default DepartmentCascader;
