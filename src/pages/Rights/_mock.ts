/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { Request, Response } from 'umi';
import { collections } from '../../utils/mockdb';
import { BatchRemoveAPIParams, pagingQueryAPIParams, TableRecord } from './data.d';

export default {
  'GET /api/rights': (req: Request, res: Response) => {
    console.log('GET /api/rights   req.query:', req.query);

    const { current, pageSize, name, pid } = (req.query as unknown) as pagingQueryAPIParams;

    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + parseInt(`${pageSize}`, 10);

    const allList = collections.rights.getAllList() as TableRecord[];

    let list = [...allList];

    if (name) {
      list = list.filter((v) => v.name.includes(name));
    }

    if (pid) {
      list = list.filter((v) => v.pid === pid);
    }

    const total = list.length;

    list = list.slice(startIndex, endIndex);

    list.forEach((v) => {
      v.parent = allList.find((v1) => v1.id === v.pid);
    });

    res.json({
      data: list,
      total,
      status: 200,
      pageSize,
      current,
    });
  },
  'GET /api/rights/tree': (req: Request, res: Response) => {
    let list = collections.rights.getAllList();

    const obj = _.groupBy(list, (v) => v.pid);

    list.forEach((v: any) => {
      v.key = v.id;
      v.value = v.id;
      v.children = obj[v.id];
    });

    list = list.filter((v: any) => !v.pid);

    res.json({
      status: 200,
      data: list,
    });
  },
  'POST /api/rights': async (req: Request, res: Response) => {
    console.log('POST /api/rights   req.body:', req.body);

    await collections.rights.create(req.body);
    res.json({ status: 200 });
  },
  'DELETE /api/rights': async (req: Request, res: Response) => {
    console.log('DELETE /api/rights   req.query:', req.query);

    const { ids } = (req.query as unknown) as BatchRemoveAPIParams;
    await collections.rights.batchRemove(ids);
    res.json({ status: 200 });
  },
  'PUT /api/rights/:id': async (req: Request, res: Response) => {
    console.log('PUT /api/rights/:id   req.params:', req.params);
    console.log('PUT /api/rights/:id   req.body:', req.body);

    await collections.rights.update({ id: req.params.id, ...req.body });
    res.json({ status: 200 });
  },
};
