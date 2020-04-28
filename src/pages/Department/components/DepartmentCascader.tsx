/* eslint-disable no-shadow */
import { Cascader } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { getIdPathAry, getTree } from '../service';

interface Props {
  value?: string;
  onChange?: (id: string, ids: string[]) => void;
}

const filter = (inputValue: string, data: any[]) => {
  return data.some((v) => v.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
};

const DepartmentCascader: React.FC<Props> = ({ value, onChange }) => {
  const { data: tree } = useRequest(getTree);

  const [currentValue, setCurrentValue] = useState<string[]>([]);

  useEffect(() => {
    if (value) {
      (async () => {
        const { status, data } = await getIdPathAry(value);
        if (status === 200) {
          setCurrentValue(data);
        }
      })();
    } else {
      setCurrentValue([]);
    }
  }, [value]);

  return (
    <Cascader
      value={currentValue}
      options={tree}
      expandTrigger="hover"
      fieldNames={{ label: 'name', value: 'id' }}
      showSearch={{ filter }}
      changeOnSelect
      onChange={(value) => {
        setCurrentValue(value);
        if (onChange) {
          onChange(value.length ? value[value.length - 1] : '', value);
        }
      }}
    />
  );
};

export default DepartmentCascader;
