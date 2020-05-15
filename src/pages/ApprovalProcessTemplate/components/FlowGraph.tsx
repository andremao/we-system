import MemberCascader from '@/pages/Member/components/MemberCascader';
import {
  ArrowRightOutlined,
  DeleteOutlined,
  DragOutlined,
  EditOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import G6 from '@antv/g6';
import { Button, Col, Divider, Drawer, Input, Radio, Row, Switch, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const clog = console.log;

const createStartNode = () => {
  return {
    id: 'start',
    label: '开始',
    labelCfg: {
      style: {
        fill: 'white',
        fontSize: 16,
      },
    },
    type: 'circle',
    size: 50,
    style: {
      fill: 'green',
      stroke: 'green',
    },
  };
};

const createEndNode = () => {
  return {
    id: 'end',
    label: '结束',
    labelCfg: {
      style: {
        fill: 'white',
        fontSize: 16,
      },
    },
    type: 'circle',
    size: 50,
    style: {
      fill: 'red',
      stroke: 'red',
    },
  };
};

// let normalNodeIdCounter = 0;
const createNormalNode = () => {
  // normalNodeIdCounter += 1;
  return {
    // id: `normal-node-${normalNodeIdCounter}`,
    label: '文本',
    labelCfg: {
      style: {
        fill: 'white',
        fontSize: 16,
      },
    },
    type: 'rect',
    style: {
      fill: 'skyblue',
      stroke: 'skyblue',
    },
  };
};

// let switchNodeIdCounter = 0;
const createSwitchNode = () => {
  // switchNodeIdCounter += 1;
  return {
    // id: `switch-node-${switchNodeIdCounter}`,
    label: '分支',
    labelCfg: {
      style: {
        fill: 'white',
        fontSize: 16,
      },
    },
    type: 'diamond',
    style: {
      fill: 'orange',
      stroke: 'orange',
    },
  };
};

// 封装点击添加开始节点的交互
G6.registerBehavior('click-add-start-node', {
  // 设定该自定义行为需要监听的事件及其响应函数
  getEvents() {
    // 监听的事件为 canvas:click，响应函数是 onClick
    return {
      'canvas:click': 'onClick',
    };
  },
  // 点击事件
  onClick(ev) {
    // 只有在没有开始节点时才创建
    if (!this.graph.findById('start')) {
      // 在图上新增一个节点
      this.graph.addItem('node', {
        ...createStartNode(),
        x: ev.x,
        y: ev.y,
      });
    }
    // this.graph.setMode('default');
  },
});

// 封装点击添加结束节点的交互
G6.registerBehavior('click-add-end-node', {
  // 设定该自定义行为需要监听的事件及其响应函数
  getEvents() {
    // 监听的事件为 canvas:click，响应函数是 onClick
    return {
      'canvas:click': 'onClick',
    };
  },
  // 点击事件
  onClick(ev) {
    // 只有在没有结束节点时才创建
    if (!this.graph.findById('end')) {
      // 在图上新增一个节点
      this.graph.addItem('node', {
        ...createEndNode(),
        x: ev.x,
        y: ev.y,
      });
    }
    // this.graph.setMode('default');
  },
});

// 封装点击添加结束节点的交互
G6.registerBehavior('click-add-normal-node', {
  // 设定该自定义行为需要监听的事件及其响应函数
  getEvents() {
    // 监听的事件为 canvas:click，响应函数是 onClick
    return {
      'canvas:click': 'onClick',
    };
  },
  // 点击事件
  onClick(ev) {
    // 在图上新增一个节点
    this.graph.addItem('node', {
      ...createNormalNode(),
      x: ev.x,
      y: ev.y,
    });
    // this.graph.setMode('default');
  },
});

// 封装点击添加结束节点的交互
G6.registerBehavior('click-add-switch-node', {
  // 设定该自定义行为需要监听的事件及其响应函数
  getEvents() {
    // 监听的事件为 canvas:click，响应函数是 onClick
    return {
      'canvas:click': 'onClick',
    };
  },
  // 点击事件
  onClick(ev) {
    // 在图上新增一个节点
    this.graph.addItem('node', {
      ...createSwitchNode(),
      x: ev.x,
      y: ev.y,
    });
    // this.graph.setMode('default');
  },
});

// 封装点击添加边的交互
G6.registerBehavior('click-add-edge', {
  // 设定该自定义行为需要监听的事件及其响应函数
  getEvents() {
    return {
      'node:click': 'onClick', // 监听事件 node:click，响应函数是 onClick
      mousemove: 'onMousemove', // 监听事件 mousemove，响应函数是 onMousemove
      'edge:click': 'onEdgeClick', // 监听事件 edge:click，响应函数是 onEdgeClick
    };
  },
  // getEvents 中定义的 'node:click' 的响应函数
  onClick(ev) {
    const node = ev.item;
    const graph = this.graph;
    // 鼠标当前点击的节点的位置
    const point = { x: ev.x, y: ev.y };
    const model = node.getModel();
    if (this.addingEdge && this.edge) {
      if (this.edge.getSource() !== node) {
        graph.updateItem(this.edge, {
          target: model.id,
        });
        this.edge = null;
        this.addingEdge = false;
      }
      // graph.setMode('default');
    } else {
      // 在图上新增一条边，结束点是鼠标当前点击的节点的位置
      this.edge = graph.addItem('edge', {
        source: model.id,
        target: point,
      });
      this.addingEdge = true;
    }
  },
  // getEvents 中定义的 mousemove 的响应函数
  onMousemove(ev) {
    // 鼠标的当前位置
    const point = { x: ev.x, y: ev.y };
    if (this.addingEdge && this.edge) {
      // 更新边的结束点位置为当前鼠标位置
      this.graph.updateItem(this.edge, {
        target: point,
      });
    }
  },
  // getEvents 中定义的 'edge:click' 的响应函数
  onEdgeClick(ev) {
    const currentEdge = ev.item;
    // 拖拽过程中，点击会点击到新增的边上
    if (this.addingEdge && this.edge == currentEdge) {
      this.graph.removeItem(this.edge);
      this.edge = null;
      this.addingEdge = false;
    }
  },
});

G6.registerBehavior('my-click-select', {
  getEvents() {
    return {
      'node:click': 'onNodeClick',
      'edge:click': 'onEdgeClick',
      'canvas:click': 'onCanvasClick',
    };
  },
  onNodeClick(ev) {
    const { item } = ev;
    item.setState('selected', !item.hasState('selected'));
  },
  onEdgeClick(ev) {
    const { item } = ev;
    item.setState('selected', !item.hasState('selected'));
  },
  onCanvasClick(ev) {
    this.graph.findAllByState('node', 'selected').forEach((v) => v.clearStates('selected'));
    this.graph.findAllByState('edge', 'selected').forEach((v) => v.clearStates('selected'));
  },
});

interface FlowGraphProps {
  data?: any;
  onSave?: (data: any) => void;
}

const FlowGraph: React.FC<FlowGraphProps> = ({ data, onSave }) => {
  const ref = useRef(null);
  // let graph: any = null;
  const [graph, setGraph] = useState<G6.Graph>(null);
  const [minimap, setMinimap] = useState<G6.Minimap>(null);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [nodeOperatorId, setNodeOperatorId] = useState<string | undefined>(undefined);

  useEffect(() => {
    G6.registerBehavior('click-edit', {
      getEvents() {
        return {
          'node:click': 'onNodeClick',
          'edge:click': 'onEdgeClick',
        };
      },
      onNodeClick(ev) {
        const { item } = ev;
        setEditItem(item);
        setNodeOperatorId(item.getModel().operatorId);
        setDrawerVisible(true);
      },
      onEdgeClick(ev) {
        const { item } = ev;
        setEditItem(item);
        setDrawerVisible(true);
      },
    });
  }, []);

  useEffect(() => {
    (async () => {
      const container = (ref.current as unknown) as HTMLElement;
      setGraph(
        new G6.Graph({
          container,
          width: container.offsetWidth,
          height: 500,
          modes: {
            default: ['drag-canvas', 'drag-node', 'my-click-select'],
            clickAddStartNode: ['click-add-start-node'],
            clickAddEndNode: ['click-add-end-node'],
            clickAddEdge: ['click-add-edge'],
            clickAddNormalNode: ['click-add-normal-node'],
            clickAddSwitchNode: ['click-add-switch-node'],
            clickEdit: ['click-edit'],
          },
          defaultNode: {
            anchorPoints: [
              [0.5, 0],
              [1, 0.5],
              [0.5, 1],
              [0, 0.5],
            ],
          },
          // 节点在不同状态下的样式集合
          nodeStateStyles: {
            // 节点在 selected 状态下的样式，对应内置的 click-select 行为
            selected: {
              shadowColor: '#333',
              shadowBlur: 10,
            },
          },
          defaultEdge: {
            type: 'polyline',
            style: {
              endArrow: true,
              offset: 20, // 拐弯处距离节点最小距离
              radius: 10, // 拐弯处的圆角弧度，若不设置则为直角
              lineWidth: 2,
              stroke: '#333',
              lineAppendWidth: 15,
            },
          },
          edgeStateStyles: {
            selected: {
              shadowColor: '#333',
              shadowBlur: 10,
            },
          },
          plugins: [new G6.Grid()], // grid不起作用
        }),
      );
    })();
  }, []);

  useEffect(() => {
    if (graph) {
      if (data) {
        graph.data(JSON.parse(data));
      }
      graph.render();
    }
  }, [graph]);

  return (
    <div>
      <Row>
        <Col span={24}>
          <div>
            <Radio.Group
              defaultValue="default"
              buttonStyle="solid"
              onChange={(e) => graph.setMode(e.target.value)}
            >
              <Tooltip placement="top" title="拖动画布、节点，或点击选择">
                <Radio.Button value="default">
                  <DragOutlined style={{ fontSize: '16px' }} />
                </Radio.Button>
              </Tooltip>
              <Tooltip placement="top" title="进入编辑模式">
                <Radio.Button value="clickEdit">
                  <EditOutlined style={{ fontSize: '16px' }} />
                </Radio.Button>
              </Tooltip>
              <Tooltip placement="top" title="添加开始节点（最多一个）">
                <Radio.Button value="clickAddStartNode">
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: 'green',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                    }}
                  />
                  &nbsp;开始
                </Radio.Button>
              </Tooltip>
              <Tooltip placement="top" title="添加结束节点（最多一个）">
                <Radio.Button value="clickAddEndNode">
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: 'red',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                    }}
                  />
                  &nbsp;结束
                </Radio.Button>
              </Tooltip>
              <Tooltip placement="top" title="添加普通节点">
                <Radio.Button value="clickAddNormalNode">
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: 'skyblue',
                      width: '10px',
                      height: '10px',
                    }}
                  />
                  &nbsp;普通
                </Radio.Button>
              </Tooltip>
              <Tooltip placement="top" title="添加分支节点">
                <Radio.Button value="clickAddSwitchNode">
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: 'orange',
                      width: '10px',
                      height: '10px',
                      transform: 'rotate(45deg)',
                    }}
                  />
                  &nbsp;分支
                </Radio.Button>
              </Tooltip>
              <Tooltip placement="top" title="添加连接线">
                <Radio.Button value="clickAddEdge">
                  <ArrowRightOutlined style={{ fontSize: '16px' }} />
                </Radio.Button>
              </Tooltip>
            </Radio.Group>
            <Divider type="vertical" />
            <Tooltip placement="top" title="删除选中项">
              <Button
                onClick={() => {
                  graph.findAllByState('node', 'selected').forEach((v) => graph.remove(v));
                  graph.findAllByState('edge', 'selected').forEach((v) => graph.remove(v));
                }}
              >
                <DeleteOutlined style={{ fontSize: '16px' }} />
              </Button>
            </Tooltip>
            &nbsp;
            <Tooltip placement="top" title="放大">
              <Button onClick={() => graph.zoom(1.1)}>
                <ZoomInOutlined style={{ fontSize: '16px' }} />
              </Button>
            </Tooltip>
            &nbsp;
            <Tooltip placement="top" title="缩小">
              <Button onClick={() => graph.zoom(0.9)}>
                <ZoomOutOutlined style={{ fontSize: '16px' }} />
              </Button>
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip placement="top" title="显示/隐藏小地图">
              <Switch
                checkedChildren="显示小地图"
                unCheckedChildren="隐藏小地图"
                onChange={(opened) => {
                  if (opened) {
                    const newMinimap = new G6.Minimap();
                    graph.addPlugin(newMinimap);
                    newMinimap.updateCanvas();
                    setMinimap(newMinimap);
                  } else {
                    graph.removePlugin(minimap);
                  }
                }}
              />
            </Tooltip>
            {/* &nbsp;
            <Tooltip placement="top" title="显示/隐藏网格">
              <Switch
                checkedChildren="显示网格"
                unCheckedChildren="隐藏网格"
                onChange={(opened) => {
                  if (opened) {
                    const grid = new G6.Grid();
                    graph.set('plugin_grid', grid);
                    graph.addPlugin(grid);
                  } else {
                    graph.removePlugin(graph.get('plugin_grid'));
                  }
                }}
              />
            </Tooltip> */}
            <Divider type="vertical" />
            <Button
              size="small"
              onClick={() => {
                clog(JSON.stringify(graph.save(), null, 2));
                if (onSave) {
                  onSave(JSON.stringify(graph.save()));
                }
              }}
            >
              保存
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div ref={ref} />
          <Drawer
            title={(editItem && editItem.getType()) === 'node' ? '节点属性' : '连线属性'}
            placement="right"
            closable={false}
            onClose={() => {
              setDrawerVisible(false);
            }}
            afterVisibleChange={(visible) => {
              if (!visible) {
                setEditItem(null);
              }
            }}
            visible={drawerVisible}
            getContainer={false}
            style={{ position: 'absolute' }}
          >
            {editItem ? (
              <>
                <div>ID</div>
                <div>
                  <Input placeholder="请输入" defaultValue={editItem.getModel().id} disabled />
                </div>
                <br />
                <div>文本</div>
                <div>
                  <Input
                    placeholder="请输入"
                    defaultValue={editItem.getModel().label}
                    onChange={(e) => {
                      editItem.update({ label: e.target.value });
                    }}
                  />
                </div>
                <br />
                {editItem.getType() === 'node' ? (
                  <>
                    <div>节点处理人</div>
                    <div>
                      <MemberCascader
                        value={nodeOperatorId}
                        onChange={(value) => {
                          clog(value);
                          editItem.getModel().operatorId = value;
                          setNodeOperatorId(value);
                        }}
                      />
                    </div>
                  </>
                ) : null}
              </>
            ) : null}
          </Drawer>
        </Col>
      </Row>
    </div>
  );
};

export default FlowGraph;
