import { Request, Response } from 'umi';

import mockjs from 'mockjs';
import { BatchRemoveAPIParams, Rights, getListAPIParams } from './data.d';

let rightsList = mockjs
  .mock({
    'list|100': [
      {
        // 'id|+1': 1,
        id: '@uuid()',
        title: '@cword(2, 5)',
        createdAt: Date.now(),
      },
    ],
  })
  .list.map((v: any) => ({ ...v, id: v.id.toString() })) as Rights[];

export default {
  'GET /api/rights': (req: Request, res: Response) => {
    console.log('GET /api/rights   query:', req.query);

    const { current, pageSize, title } = (req.query as unknown) as getListAPIParams;

    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + parseInt(`${pageSize}`, 10);

    let list = [...rightsList];

    if (title) {
      list = list.filter((v) => v.title.includes(title));
    }

    res.json({
      data: list.slice(startIndex, endIndex),
      total: list.length,
      success: true,
      pageSize,
      current,
    });
  },
  'DELETE /api/rights': (req: Request, res: Response) => {
    console.log('DELETE /api/rights   query:', req.query);

    const { ids } = (req.query as unknown) as BatchRemoveAPIParams;

    rightsList = rightsList.filter(({ id }) => !ids.includes(id));

    res.json({ status: 200 });
  },
};
