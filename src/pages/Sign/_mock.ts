/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { Request, Response } from 'umi';
import { collections } from '../../utils/mockdb';
import { pagingQueryAPIParams, TableRecord } from './data.d';

export default {
  'GET /api/sign/paging': (req: Request, res: Response) => {
    console.log('GET /api/sign/paging   req.query:', req.query);

    const { current, pageSize, name } = (req.query as unknown) as pagingQueryAPIParams;

    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + parseInt(`${pageSize}`, 10);

    const allList = collections.sign.getAllList() as TableRecord[];

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
};
