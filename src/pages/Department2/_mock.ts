/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { Request, Response } from 'umi';
import { collections } from '../../utils/mockdb';
import { pagingQueryAPIParams, TableRecord } from './data.d';

export default {
  'GET /api/department2/paging': (req: Request, res: Response) => {
    console.log('GET /api/department2/paging   req.query:', req.query);

    const { current, pageSize } = (req.query as unknown) as pagingQueryAPIParams;

    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + parseInt(`${pageSize}`, 10);

    const allList = collections.department.getAllList() as TableRecord[];

    let list = [...allList];

    // TODO: conditions filter

    const total = list.length;

    list = list.slice(startIndex, endIndex);

    list.forEach((v) => (v.parent = allList.find((v1) => v1.id === v.pid)));

    res.json({ data: list, total, status: 200, pageSize, current });
  },
  'PUT /api/department2/:id': (req: Request, res: Response) => {
    console.log('PUT /api/department2/:id   req.params:', req.params);
    console.log('PUT /api/department2/:id   req.body:', req.body);

    collections.department.update({ ...req.params, ...req.body });

    res.json({ status: 200 });
  },
};
