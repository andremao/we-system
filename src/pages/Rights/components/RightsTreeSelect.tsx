import React from 'react';
import { TreeSelect } from 'antd';
import { useRequest } from 'umi';
import { getTreeList } from '../service';

interface Props {
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  treeCheckable?: boolean;
}

const RightsTreeSelect = (props: Props) => {
  const { data: treeData } = useRequest(getTreeList);

  return (
    <TreeSelect
      allowClear
      showSearch
      treeData={treeData}
      treeNodeFilterProp="name"
      treeNodeLabelProp="name"
      treeCheckable={props.treeCheckable}
      showCheckedStrategy={TreeSelect.SHOW_ALL}
      maxTagCount={3}
      placeholder="请选择"
      style={{ width: '100%' }}
      value={props.value}
      onChange={(v: string | string[]) => {
        console.log('value', v);

        if (props.onChange) {
          props.onChange(v);
        }
      }}
    />
  );
};

export default RightsTreeSelect;
