// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { TableListItem, TableListParams } from './data.d';
import { cloneDeep } from 'lodash';

// mock tableListDataSource
const tableListDataSource: TableListItem[] = [
  {
    id: '1',
    name: '传智播客',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: null,
    pids: [],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-1',
    name: '总部',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-2',
    name: '北京顺义校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-3',
    name: '北京昌平校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-4',
    name: '广州校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-5',
    name: '上海校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-6',
    name: '武汉校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-7',
    name: '深圳校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-8',
    name: '郑州校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-9',
    name: '西安校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-10',
    name: '西安校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-11',
    name: '哈尔滨校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-12',
    name: '长沙校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-12-1',
    name: '长沙校区JavaEE教研部',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1-12',
    pids: ['1', '1-12'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-12-2',
    name: '长沙校区前端与移动开发教研部',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1-12',
    pids: ['1', '1-12'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-12-3',
    name: '长沙校区Python教研部',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1-12',
    pids: ['1', '1-12'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-12-4',
    name: '长沙校区UI UE+全栈设计教研部',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1-12',
    pids: ['1', '1-12'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-12-5',
    name: '长沙校区校办',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1-12',
    pids: ['1', '1-12'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-12-6',
    name: '长沙校区财务部',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1-12',
    pids: ['1', '1-12'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-12-7',
    name: '长沙校区人事行政部',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1-12',
    pids: ['1', '1-12'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-12-8',
    name: '长沙校区学工部',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1-12',
    pids: ['1', '1-12'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-12-9',
    name: '长沙校区就业服务部',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1-12',
    pids: ['1', '1-12'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-12-10',
    name: '长沙校区网络营销部',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1-12',
    pids: ['1', '1-12'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-12-11',
    name: '长沙校区院校合作部',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1-12',
    pids: ['1', '1-12'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-12-12',
    name: '长沙校区咨询部',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1-12',
    pids: ['1', '1-12'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-13',
    name: '济南校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-14',
    name: '重庆校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-15',
    name: '南京校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-16',
    name: '杭州校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-17',
    name: '成都校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-18',
    name: '石家庄校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-19',
    name: '太原校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-20',
    name: '合肥校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-21',
    name: '沐阳校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-22',
    name: '厦门校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-23',
    name: '沈阳校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-24',
    name: '天津校区',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
  {
    id: '1-25',
    name: '员工服务',
    status: 1,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: '1',
    pids: ['1'],
    manager: { id: '1', name: '黎总' },
  },
];

const managerList = [
  { id: '1', name: '黎总' },
  { id: '2', name: '张三' },
  { id: '3', name: '李四' },
  { id: '4', name: '王五' },
  { id: '5', name: '赵六' },
];

export default {
  'GET /api/department': (req: Request, res: Response) => {
    const params = req.query as TableListParams;

    let data = tableListDataSource;

    if (params.name) {
      data = data.filter((v) => v.name.includes(params.name));
    }

    if (params.pid) {
      data = data.filter((v) => v.pid === params.pid);
    }

    if (params.status) {
      data = data.filter((v) => v.status === params.status - 0);
    }

    res.json({
      data,
      success: true,
      current: params.currentPage || 1,
      pageSize: params.pageSize || 10,
      total: data.length,
    });
  },
  'GET /api/department/tree': (req: Request, res: Response) => {
    const formatTree = () => {
      const cloneData = cloneDeep(tableListDataSource);
      const treeData: TableListItem[] = [];
      cloneData.forEach((item) => {
        if (item.pid) {
          const parent = cloneData.find((v) => v.id === item.pid) as TableListItem;
          if (!parent.children) {
            parent.children = [item];
          } else {
            parent.children.push(item);
          }
        } else {
          treeData.push(item);
        }
      });
      return treeData;
    };
    res.json({
      data: formatTree(),
    });
  },
  'GET /api/department/manager/list': (req: Request, res: Response) => {
    res.json({
      data: managerList,
    });
  },
  'PUT /api/department': (req: Request, res: Response) => {
    console.log(req.body, 'PUT /api/department     req.body');

    res.json({
      status: 200,
    });
  },
};
