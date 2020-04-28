/* eslint-disable no-shadow */
import { Button, Transfer } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { getAllList } from '../service';

interface RoleCascaderProps {
  value?: string;
  /**
   * @param roleIds 当前选中的角色id，多个用,隔开
   */
  onChange?: (roleIds: string) => void;
  onReset?: () => void;
}

const RoleCascader: React.FC<RoleCascaderProps> = ({ value, onChange, onReset }) => {
  const { data: roles } = useRequest(getAllList);
  const dataSource = roles ? roles.map((v: any) => ({ key: v.id, name: v.name })) : [];

  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  useEffect(() => {
    setTargetKeys(value ? value.split(',') : []);
  }, [value]);

  return (
    <Transfer
      dataSource={dataSource}
      showSearch
      listStyle={{
        width: 197,
        height: 250,
      }}
      operations={['添加', '移除']}
      targetKeys={targetKeys}
      onChange={(targetKeys) => {
        setTargetKeys(targetKeys);
        if (onChange) onChange(targetKeys.join(','));
      }}
      render={(v) => v.name}
      titles={[
        null,
        onReset ? (
          <Button size="small" onClick={onReset}>
            重置
          </Button>
        ) : null,
      ]}
    />
  );
};

export default RoleCascader;
