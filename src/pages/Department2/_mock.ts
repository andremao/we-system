/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import _ from 'lodash';
import { Request, Response } from 'umi';
import { collections, T_Department } from '../../utils/mockdb';
import { pagingQueryAPIParams, TableRecord } from './data.d';

export default {
  'GET /api/department2/paging': (req: Request, res: Response) => {
    console.log('GET /api/department2/paging   req.query:', req.query);

    const { current, pageSize, name, pid } = (req.query as unknown) as pagingQueryAPIParams;

    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + parseInt(`${pageSize}`, 10);

    const allList = collections.department.getAllList() as TableRecord[];

    let list = [...allList];

    // conditions
    if (name) {
      list = list.filter((v) => v.name.includes(name));
    }
    if (pid) {
      list = list.filter((v) => v.pid === pid);
    }
    // /conditions

    const total = list.length;

    list = list.slice(startIndex, endIndex);

    const allMembers = collections.member.getAllList();

    list.forEach((v) => {
      v.manager = allMembers.find((v2) => v2.id === v.manager_id);
      v.parent = allList.find((v1) => v1.id === v.pid);
    });

    res.json({ data: list, total, status: 200, pageSize, current });
  },
  'POST /api/department2': async (req: Request, res: Response) => {
    console.log('POST /api/department2   req.body:', req.body);

    const department = await collections.department.create(req.body);

    res.json({ status: 200, data: department });
  },
  'PUT /api/department2/:id': (req: Request, res: Response) => {
    console.log('PUT /api/department2/:id   req.params:', req.params);
    console.log('PUT /api/department2/:id   req.body:', req.body);

    collections.department.update({ ...req.params, ...req.body });

    res.json({ status: 200 });
  },
  'GET /api/department2/tree': (req: Request, res: Response) => {
    let list = collections.department.getAllList();

    const obj = _.groupBy(list, (v) => v.pid);

    list.forEach((v: any) => {
      v.key = v.id;
      v.value = v.id;
      v.children = obj[v.id];
    });

    list = list.filter((v: any) => !v.pid);

    res.json({ status: 200, data: list });
  },
  'GET /api/department2/:id/path-ary': (req: Request, res: Response) => {
    console.log('GET /api/department2/:id/path-ary   req.params:', req.params);

    const { id } = req.params;

    const pathAry = [id];

    const al = collections.department.getAllList();

    let d = al.find((v) => v.id === id) as T_Department;

    while (d.pid) {
      pathAry.unshift(d.pid);
      d = al.find((v) => v.id === d.pid) as T_Department;
    }

    res.json({ status: 200, data: pathAry });
  },
};
