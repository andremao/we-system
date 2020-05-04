/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { Request, Response } from 'umi';
import { collections } from '../../utils/mockdb';
import { pagingQueryAPIParams, TableRecord } from './data.d';

export default {
  'GET /api/approval/paging': (req: Request, res: Response) => {
    console.log('GET /api/approval/paging   req.query:', req.query);

    const { current, pageSize, name } = (req.query as unknown) as pagingQueryAPIParams;

    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + parseInt(`${pageSize}`, 10);

    const allList = collections.approval.getAllList() as TableRecord[];

    let list = [...allList];

    // conditions
    if (name) {
      list = list.filter((v) => v.name.includes(name));
    }
    // /conditions

    const total = list.length;

    list = list.slice(startIndex, endIndex);

    res.json({ data: list, total, status: 200, pageSize, current });
  },
  'POST /api/approval': async (req: Request, res: Response) => {
    const { memberIds, ...restBody } = req.body;
    const approval = await collections.approval.create(restBody);
    res.json({ status: 200, data: approval });
  },
  'PUT /api/approval/:id': async (req: Request, res: Response) => {
    console.log('PUT /api/approval/:id   req.params:', req.params);
    console.log('PUT /api/approval/:id   req.body:', req.body);

    await collections.approval.update({ ...req.params, ...req.body });

    res.json({ status: 200 });
  },
  'DELETE /api/approval': async (req: Request, res: Response) => {
    console.log('DELETE /api/approval   req.body:', req.body);

    await collections.approval.batchRemove(req.body.ids);

    res.json({ status: 200 });
  },
};
