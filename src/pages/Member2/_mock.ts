/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { Request, Response } from 'umi';
import { collections } from '../../utils/mockdb';
import { pagingQueryAPIParams, TableRecord } from './data.d';

export default {
  'GET /api/member2/paging': (req: Request, res: Response) => {
    console.log('GET /api/member2/paging   req.query:', req.query);

    const { current, pageSize } = (req.query as unknown) as pagingQueryAPIParams;

    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + parseInt(`${pageSize}`, 10);

    const allList = collections.member.getAllList() as TableRecord[];

    let list = [...allList];

    // TODO: conditions filter

    const total = list.length;

    list = list.slice(startIndex, endIndex);

    const departments = collections.department.getAllList();
    const roles = collections.role.getAllList();

    list.forEach((v) => {
      if (v.department_id) {
        v.department = departments.find((d) => d.id === v.department_id);
      }
      if (v.role_ids) {
        v.roles = roles.filter((role) => v.role_ids.split(',').includes(role.id));
      }
    });

    res.json({ data: list, total, status: 200, pageSize, current });
  },
  'PUT /api/member2/:id': (req: Request, res: Response) => {
    console.log('PUT /api/member2/:id   req.params:', req.params);
    console.log('PUT /api/member2/:id   req.body:', req.body);

    collections.member.update({ ...req.params, ...req.body });

    res.json({ status: 200 });
  },
};