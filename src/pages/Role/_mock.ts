import { Request, Response } from 'umi';

import mockjs from 'mockjs';
import { BatchRemoveAPIParams, TableRecordVO, getListAPIParams } from './data.d';

let tableRecords = mockjs.mock({
  'list|100': [
    {
      // 'id|+1': 1,
      id: '@uuid()',
      name: '@cword(2, 8)',
      createdAt: '@datetime("yyyy-MM-dd HH:mm:ss")',
    },
  ],
}).list as TableRecordVO[];

export default {
  'GET /api/role': (req: Request, res: Response) => {
    console.log('GET /api/role   query:', req.query);

    const { current, pageSize, name } = (req.query as unknown) as getListAPIParams;

    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + parseInt(`${pageSize}`, 10);

    let list = [...tableRecords];

    if (name) {
      list = list.filter((v) => v.name.includes(name));
    }

    res.json({
      data: list.slice(startIndex, endIndex),
      total: list.length,
      status: 200,
      pageSize,
      current,
    });
  },
  'DELETE /api/role': (req: Request, res: Response) => {
    console.log('DELETE /api/role   query:', req.query);

    const { ids } = (req.query as unknown) as BatchRemoveAPIParams;

    tableRecords = tableRecords.filter(({ id }) => !ids.includes(id));

    res.json({ status: 200 });
  },
};
