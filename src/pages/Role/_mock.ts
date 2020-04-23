import { Request, Response } from 'umi';

import mockjs from 'mockjs';
import { BatchRemoveAPIParams, Role, getRoleListAPIParams } from './data.d';

let roleList = mockjs
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
  .list.map((v: any) => ({ ...v, id: v.id.toString() })) as Role[];

export default {
  'GET /api/role': (req: Request, res: Response) => {
    console.log('GET /api/role   query:', req.query);

    const { current, pageSize } = (req.query as unknown) as getRoleListAPIParams;

    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + parseInt(`${pageSize}`, 10);

    res.json({
      data: roleList.slice(startIndex, endIndex),
      total: roleList.length,
      success: true,
      pageSize,
      current,
    });
  },
  'DELETE /api/role': (req: Request, res: Response) => {
    console.log('DELETE /api/role   query:', req.query);

    const { ids } = (req.query as unknown) as BatchRemoveAPIParams;

    roleList = roleList.filter(({ id }) => !ids.includes(id));

    res.json({ status: 200 });
  },
};
