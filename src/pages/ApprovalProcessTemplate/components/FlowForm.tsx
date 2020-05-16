/* eslint-disable no-useless-escape */
import { DeleteOutlined, ExclamationCircleOutlined, SettingOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Drawer,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Tooltip,
} from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { uniqueId } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { Sortable } from 'react-sortablejs';
import styles from './FlowForm.less';

const { log } = console;

enum ComponentType {
  // eslint-disable-next-line no-shadow
  Input = 'Input',
  TextArea = 'TextArea',
  Money = 'Money',
  // eslint-disable-next-line no-shadow
  Radio = 'Radio',
  // eslint-disable-next-line no-shadow
  Checkbox = 'Checkbox',
  // eslint-disable-next-line no-shadow
  Select = 'Select',
  // eslint-disable-next-line no-shadow
  DatePicker = 'DatePicker',
  RangePicker = 'RangePicker',
}

const getDefItemDataMap = (type: any) => {
  switch (type) {
    case ComponentType.Input:
      return { id: uniqueId(), type: 'Input', label: '单行文本' };
    case ComponentType.TextArea:
      return { id: uniqueId(), type: 'TextArea', label: '多行文本' };
    case ComponentType.Money:
      return { id: uniqueId(), type: 'Money', label: '金额' };
    case ComponentType.Radio:
      return {
        id: uniqueId(),
        type: 'Radio',
        label: '单选框',
        opts: [
          { label: 'A', value: 'A' },
          { label: 'B', value: 'B' },
        ],
      };
    case ComponentType.Checkbox:
      return {
        id: uniqueId(),
        type: 'Checkbox',
        label: '多选框',
        opts: [
          { label: 'A', value: 'A' },
          { label: 'B', value: 'B' },
        ],
      };
    case ComponentType.Select:
      return {
        id: uniqueId(),
        type: 'Select',
        label: '下拉列表',
        opts: [
          { label: 'A', value: 'A' },
          { label: 'B', value: 'B' },
        ],
      };
    case ComponentType.DatePicker:
      return { id: uniqueId(), type: 'DatePicker', label: '日期' };
    case ComponentType.RangePicker:
      return { id: uniqueId(), type: 'RangePicker', label: '日期区间' };
    default:
      return null;
  }
};

const DragItem: FC<{
  children: any;
  item: any;
  onRemove?: () => void;
  onEdit?: () => void;
}> = (props) => {
  return (
    <Row style={{ marginBottom: '10px' }} gutter={10}>
      {/* <Col>
        <div className="drag-handle" style={{ cursor: 'move' }}>
          <DragOutlined />
        </div>
      </Col> */}
      <Col>
        <Tooltip title="编辑">
          <SettingOutlined
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (props.onEdit) props.onEdit();
            }}
          />
        </Tooltip>
        &nbsp;
        <Tooltip title="移除">
          <DeleteOutlined
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (props.onRemove) props.onRemove();
            }}
          />
        </Tooltip>
      </Col>
      <Col span={6} style={{ textAlign: 'right' }}>
        <Tooltip title={`数据字段名：${props.item.fieldName || ''}`}>
          <span>
            {props.item.required ? <span style={{ color: 'red' }}>*&nbsp;</span> : null}
            {props.item.label}：
          </span>
        </Tooltip>
      </Col>
      <Col>{props.children}</Col>
    </Row>
  );
};

const FlowForm: FC<{
  onSave?: (data: any) => void;
}> = (props) => {
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);

  const [editItem, setEditItem] = useState(null);

  const [data, setData] = useState<any[]>([
    { id: uniqueId(), type: 'Input', label: '单行文本' },
    { id: uniqueId(), type: 'TextArea', label: '多行文本' },
    { id: uniqueId(), type: 'Money', label: '金额' },
    {
      id: uniqueId(),
      type: 'Radio',
      label: '单选框',
      opts: [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
      ],
    },
    {
      id: uniqueId(),
      type: 'Checkbox',
      label: '多选框',
      opts: [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
      ],
    },
    {
      id: uniqueId(),
      type: 'Select',
      label: '下拉列表',
      opts: [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
      ],
    },
    { id: uniqueId(), type: 'DatePicker', label: '日期' },
    { id: uniqueId(), type: 'RangePicker', label: '日期区间' },
  ]);

  const renderForm = () => {
    const onRemove = (id: string) => {
      Modal.confirm({
        title: '你确定要删除吗?',
        icon: <ExclamationCircleOutlined />,
        maskClosable: true,
        onOk() {
          setData(data.filter((v) => v.id !== id));
        },
      });
    };

    const onEdit = (item: any) => {
      setEditDrawerVisible(true);
      setEditItem(item);
    };

    return data.map((v) => {
      switch (v.type) {
        case ComponentType.Input:
          return (
            <DragItem
              key={uniqueId()}
              item={v}
              onRemove={() => onRemove(v.id)}
              onEdit={() => onEdit(v)}
            >
              <Input placeholder="请输入" {...v.props} />
            </DragItem>
          );
        case ComponentType.TextArea:
          return (
            <DragItem
              key={uniqueId()}
              item={v}
              onRemove={() => onRemove(v.id)}
              onEdit={() => onEdit(v)}
            >
              <Input.TextArea placeholder="请输入" {...v.props} />
            </DragItem>
          );
        case ComponentType.Money:
          return (
            <DragItem
              key={uniqueId()}
              item={v}
              onRemove={() => onRemove(v.id)}
              onEdit={() => onEdit(v)}
            >
              <InputNumber
                formatter={(value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => (value ? value.replace(/\￥\s?|(,*)/g, '') : '')}
                min={0}
                {...v.props}
              />
            </DragItem>
          );
        case ComponentType.Radio:
          return (
            <DragItem
              key={uniqueId()}
              item={v}
              onRemove={() => onRemove(v.id)}
              onEdit={() => onEdit(v)}
            >
              <Radio.Group options={v.opts} />
            </DragItem>
          );
        case ComponentType.Checkbox:
          return (
            <DragItem
              key={uniqueId()}
              item={v}
              onRemove={() => onRemove(v.id)}
              onEdit={() => onEdit(v)}
            >
              <Checkbox.Group options={v.opts} />
            </DragItem>
          );
        case ComponentType.Select:
          return (
            <DragItem
              key={uniqueId()}
              item={v}
              onRemove={() => onRemove(v.id)}
              onEdit={() => onEdit(v)}
            >
              <Select placeholder="请选择">
                {v.opts.map((opt: any) => {
                  return (
                    <Select.Option key={uniqueId()} value={opt.value}>
                      {opt.label}
                    </Select.Option>
                  );
                })}
              </Select>
            </DragItem>
          );
        case ComponentType.DatePicker:
          return (
            <DragItem
              key={uniqueId()}
              item={v}
              onRemove={() => onRemove(v.id)}
              onEdit={() => onEdit(v)}
            >
              <DatePicker />
            </DragItem>
          );
        case ComponentType.RangePicker:
          return (
            <DragItem
              key={uniqueId()}
              item={v}
              onRemove={() => onRemove(v.id)}
              onEdit={() => onEdit(v)}
            >
              <DatePicker.RangePicker />
            </DragItem>
          );
        default:
          return null;
      }
    });
  };

  useEffect(() => {
    const componentListBox = document.querySelector(
      '#component_list > .ant-card-body',
    ) as HTMLElement;

    const formBox = document.querySelector('#flow_form_box > .ant-card-body') as HTMLElement;

    const componentListSortable = Sortable.create(componentListBox, {
      group: { name: 'flow_form', pull: 'clone', put: false },
      sort: false,
    });

    const formSortable = Sortable.create(formBox, {
      group: { name: 'flow_form' },
      // handle: '.drag-handle',
      ghostClass: styles.sortableGhost,
      onAdd(e) {
        const { type } = e.item.dataset;
        e.item.remove();
        data.splice(e.newIndex as number, 0, getDefItemDataMap(type));
        setData([...data]);
      },
      onSort(e) {
        if (e.from === componentListBox) return;
        const datum = data.splice(e.oldIndex as number, 1)[0];
        data.splice(e.newIndex as number, 0, datum);
        setData([...data]);
      },
    });

    return () => {
      componentListSortable.destroy();
      formSortable.destroy();
    };
  }, [data]);

  return (
    <div>
      <Alert
        message="注意：操作完请点击保存按钮！！！"
        type="warning"
        showIcon
        style={{ marginBottom: '10px' }}
      />
      <Row gutter={15}>
        <Col span={14}>
          <Card
            id="flow_form_box"
            title="表单"
            extra={
              <Button
                type="link"
                onClick={() => {
                  if (props.onSave) {
                    props.onSave(JSON.stringify(data));
                  }
                }}
              >
                保存
              </Button>
            }
          >
            {renderForm()}
          </Card>
        </Col>
        <Col span={10}>
          <Card id="component_list" title="表单组件">
            <div data-type="Input" style={{ marginBottom: '8px' }}>
              <Row gutter={10}>
                <Col span={8} style={{ textAlign: 'right' }}>
                  单行文本：
                </Col>
                <Col>
                  <Input placeholder="请输入" style={{ width: '200px' }} />
                </Col>
              </Row>
            </div>
            <div data-type="TextArea" style={{ marginBottom: '8px' }}>
              <Row gutter={10}>
                <Col span={8} style={{ textAlign: 'right' }}>
                  多行文本：
                </Col>
                <Col>
                  <Input.TextArea placeholder="请输入" style={{ width: '200px' }} />
                </Col>
              </Row>
            </div>
            <div data-type="Money" style={{ marginBottom: '8px' }}>
              <Row gutter={10}>
                <Col span={8} style={{ textAlign: 'right' }}>
                  金额：
                </Col>
                <Col>
                  <InputNumber
                    formatter={(value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => (value ? value.replace(/\￥\s?|(,*)/g, '') : '')}
                    min={0}
                  />
                </Col>
              </Row>
            </div>
            <div data-type="Radio" style={{ marginBottom: '8px' }}>
              <Row gutter={10}>
                <Col span={8} style={{ textAlign: 'right' }}>
                  单选框：
                </Col>
                <Col>
                  <Radio.Group>
                    <Radio value="A">A</Radio>
                    <Radio value="B">B</Radio>
                  </Radio.Group>
                </Col>
              </Row>
            </div>
            <div data-type="Checkbox" style={{ marginBottom: '8px' }}>
              <Row gutter={10}>
                <Col span={8} style={{ textAlign: 'right' }}>
                  多选框：
                </Col>
                <Col>
                  <Checkbox.Group>
                    <Checkbox value="A">A</Checkbox>
                    <Checkbox value="B">B</Checkbox>
                  </Checkbox.Group>
                </Col>
              </Row>
            </div>
            <div data-type="Select" style={{ marginBottom: '8px' }}>
              <Row gutter={10}>
                <Col span={8} style={{ textAlign: 'right' }}>
                  下拉列表：
                </Col>
                <Col>
                  <Select placeholder="请选择" style={{ width: '200px' }}>
                    <Select.Option value="A">A</Select.Option>
                    <Select.Option value="B">B</Select.Option>
                    <Select.Option value="C">C</Select.Option>
                  </Select>
                </Col>
              </Row>
            </div>
            <div data-type="DatePicker" style={{ marginBottom: '8px' }}>
              <Row gutter={10}>
                <Col span={8} style={{ textAlign: 'right' }}>
                  日期：
                </Col>
                <Col>
                  <DatePicker style={{ width: '200px' }} />
                </Col>
              </Row>
            </div>
            <div data-type="RangePicker" style={{ marginBottom: '8px' }}>
              <Row gutter={10}>
                <Col span={8} style={{ textAlign: 'right' }}>
                  日期区间：
                </Col>
                <Col>
                  <DatePicker.RangePicker style={{ width: '200px' }} />
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
      <Drawer
        title="编辑表单项"
        placement="right"
        closable={false}
        getContainer={false}
        visible={editDrawerVisible}
        style={{ position: 'absolute' }}
        onClose={() => {
          setEditDrawerVisible(false);
        }}
        afterVisibleChange={(visible) => {
          if (!visible) setEditItem(null);
        }}
      >
        {editItem ? (
          <div>
            <div>数据字段名</div>
            <div>
              <Input
                placeholder="请输入"
                defaultValue={editItem.fieldName}
                onBlur={(e) => {
                  editItem.fieldName = e.target.value;
                  setData([...data]);
                }}
              />
            </div>
            <br />
            <div>标题</div>
            <div>
              <Input
                placeholder="请输入"
                defaultValue={editItem.label}
                onBlur={(e) => {
                  editItem.label = e.target.value;
                  setData([...data]);
                }}
              />
            </div>
            <br />
            <div>
              是否必填：
              <Checkbox
                checked={editItem.required}
                onChange={(e) => {
                  editItem.required = e.target.checked;
                  setData([...data]);
                }}
              >
                必填
              </Checkbox>
            </div>
            <br />
            {[ComponentType.Radio, ComponentType.Checkbox, ComponentType.Select].includes(
              editItem.type,
            ) ? (
              <div>
                <div>
                  可选项（格式：label=value，多个用英文逗号&quot;,&quot;分隔，如：篮球=1,足球=2,羽毛球=3）
                </div>
                <div>
                  <Input
                    placeholder="请输入"
                    defaultValue={editItem.opts.map((v: any) => `${v.label}=${v.value}`).join(',')}
                    onBlur={(e) => {
                      editItem.opts = e.target.value.split(',').map((v) => {
                        const ary = v.split('=');
                        return { label: ary[0], value: ary[1] };
                      });
                      setData([...data]);
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </Drawer>
    </div>
  );
};

export default FlowForm;
