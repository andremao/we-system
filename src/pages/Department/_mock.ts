/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import _ from 'lodash';
import { Request, Response } from 'umi';
import { collections, T_Department } from '../../utils/mockdb';
import { pagingQueryAPIParams, TableRecord } from './data.d';

export default {
  'GET /api/department/paging': (req: Request, res: Response) => {
    console.log('GET /api/department/paging   req.query:', req.query);

    const {
      current,
      pageSize,
      name,
      pid,
      manager_id,
    } = (req.query as unknown) as pagingQueryAPIParams;

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
    if (manager_id) {
      list = list.filter((v) => v.manager_id === manager_id);
    }
    // /conditions

    const total = list.length;

    list = list.slice(startIndex, endIndex);

    const allMembers = collections.member.getAllList();

    list.forEach((v) => {
      v.manager = allMembers.find((v2) => v2.id === v.manager_id);
      v.memberIds = allMembers
        .filter((v3) => v3.department_id === v.id)
        .map((v4) => v4.id)
        .join(',');
      v.parent = allList.find((v1) => v1.id === v.pid);
    });

    res.json({ data: list, total, status: 200, pageSize, current });
  },
  'POST /api/department': async (req: Request, res: Response) => {
    const { memberIds, ...restBody } = req.body;
    const department = await collections.department.create(restBody);
    await collections.member.batchSetDepartment(memberIds, department.id);
    res.json({ status: 200, data: department });
  },
  'PUT /api/department/:id': async (req: Request, res: Response) => {
    console.log('PUT /api/department/:id   req.params:', req.params);
    console.log('PUT /api/department/:id   req.body:', req.body);

    const { id } = req.params;
    const { memberIds, ...restBody } = req.body;

    await collections.member.batchSetDepartment(memberIds, id);

    await collections.department.update({ ...req.params, ...restBody });

    res.json({ status: 200 });
  },
  'DELETE /api/department': (req: Request, res: Response) => {
    console.log('DELETE /api/department   req.body:', req.body);

    collections.department.remove(req.body.ids);

    res.json({ status: 200 });
  },

  'GET /api/department/tree': (req: Request, res: Response) => {
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
  'GET /api/department/:id/path-ary': (req: Request, res: Response) => {
    console.log('GET /api/department/:id/path-ary   req.params:', req.params);

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
