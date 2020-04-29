/* eslint-disable no-param-reassign */
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { getAllMembers } from '../service';

export interface MemberCascaderProps {
  mode?: 'multiple' | 'tags';
  /**
   * 选中的成员id，多个用,分隔
   */
  value?: string;
  /**
   * @param value 选中的成员id，如果mode='multiple'，则用,分隔
   */
  onChange?: (value: string) => void;
}

const MemberCascader: React.FC<MemberCascaderProps> = ({ mode, value, onChange }) => {
  const { data: allMembers } = useRequest(getAllMembers);

  const [defVal, setDefVal] = useState<string | string[] | undefined>();

  useEffect(() => {
    if (mode) {
      setDefVal(value ? value.split(',') : []);
    } else {
      setDefVal(value || undefined);
    }
  }, [value]);

  return (
    <Select
      mode={mode}
      showSearch
      placeholder="请选择"
      value={defVal}
      filterOption={(inputValue, option) => {
        if (option?.label?.toString().includes(inputValue)) {
          return true;
        }
        return false;
      }}
      onChange={(val) => {
        if (onChange) {
          if (val) {
            val = Array.isArray(val) ? val.join(',') : val;
          } else {
            val = '';
          }
          onChange(val);
        }
      }}
      options={
        allMembers
          ? allMembers.map(({ id, job_number, name, department, position, mobile }) => ({
              value: id,
              label: `${job_number}-${name}(${
                department ? department.name : '无'
              }-${position})(${mobile})`,
            }))
          : []
      }
      allowClear
      maxTagCount={6}
    />
  );
};

export default MemberCascader;
