/* eslint-disable no-useless-escape */
import { DeleteOutlined, ExclamationCircleOutlined, SettingOutlined } from '@ant-design/icons';
import {
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

const DragItem: FC<{
  children: any;
  label: string;
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
        {props.label}：
      </Col>
      <Col>{props.children}</Col>
    </Row>
  );
};

interface Props {}

const FlowForm: FC<Props> = () => {
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);

  const [editItem, setEditItem] = useState(null);

  const [data, setData] = useState<any[]>([
    { id: uniqueId(), type: 'Input', props: {} },
    { id: uniqueId(), type: 'TextArea', props: { placeholder: '请输入' } },
    { id: uniqueId(), type: 'Money', props: { placeholder: '请输入' } },
    { id: uniqueId(), type: 'Radio', props: {} },
    { id: uniqueId(), type: 'Checkbox', props: {} },
    { id: uniqueId(), type: 'Select', props: {} },
    { id: uniqueId(), type: 'DatePicker', props: {} },
    { id: uniqueId(), type: 'RangePicker', props: {} },
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
              label="单行文本"
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
              label="多行文本"
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
              label="金额"
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
              label="单选框"
              onRemove={() => onRemove(v.id)}
              onEdit={() => onEdit(v)}
            >
              <Radio.Group>
                <Radio value="A">A</Radio>
                <Radio value="B">B</Radio>
              </Radio.Group>
            </DragItem>
          );
        case ComponentType.Checkbox:
          return (
            <DragItem
              key={uniqueId()}
              label="多选框"
              onRemove={() => onRemove(v.id)}
              onEdit={() => onEdit(v)}
            >
              <Checkbox.Group>
                <Checkbox value="A">A</Checkbox>
                <Checkbox value="B">B</Checkbox>
              </Checkbox.Group>
            </DragItem>
          );
        case ComponentType.Select:
          return (
            <DragItem
              key={uniqueId()}
              label="下拉列表"
              onRemove={() => onRemove(v.id)}
              onEdit={() => onEdit(v)}
            >
              <Select placeholder="请选择">
                <Select.Option value="A">A</Select.Option>
                <Select.Option value="B">B</Select.Option>
                <Select.Option value="C">C</Select.Option>
              </Select>
            </DragItem>
          );
        case ComponentType.DatePicker:
          return (
            <DragItem
              key={uniqueId()}
              label="日期"
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
              label="日期区间"
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
    log('hehe');

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
        data.splice(e.newIndex as number, 0, { id: uniqueId(), type, props: {} });
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
      <Row gutter={15}>
        <Col span={14}>
          <Card id="flow_form_box" title="表单">
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
      >
        {(() => {
          if (!editItem) return null;
          if (editItem.type === ComponentType.Input) {
            return <p>input...</p>;
          }
          if (editItem.type === ComponentType.TextArea) {
            return <p>textarea...</p>;
          }
          return null;
        })()}
      </Drawer>
    </div>
  );
};

export default FlowForm;
