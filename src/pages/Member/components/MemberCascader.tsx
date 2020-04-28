import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { getAllList } from '../service';

export interface MemberCascaderProps {
  mode?: 'multiple' | 'tags';
  value?: string;
  /**
   * @param value 选中的成员id，多个用,分隔
   */
  onChange?: (value: string) => void;
}

const MemberCascader: React.FC<MemberCascaderProps> = ({ mode, value, onChange }) => {
  const { data: allList } = useRequest(getAllList);

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
      style={{ width: '100%' }}
      placeholder="请选择"
      value={defVal}
      filterOption={(inputValue, option) => {
        if (option?.label?.toString().includes(inputValue)) {
          return true;
        }
        return false;
      }}
      onChange={(val) => {
        if (onChange) onChange(Array.isArray(val) ? val.join(',') : val);
      }}
      options={
        allList
          ? allList.map((v) => ({
              value: v.id,
              label: `${v.job_number}-${v.name}(${v.position})(${v.mobile})`,
            }))
          : []
      }
      allowClear
      maxTagCount={10}
    />
  );
};

export default MemberCascader;
