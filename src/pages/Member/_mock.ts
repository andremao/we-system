// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { TableListItem, TableListSearchParams } from './data.d';

// mock tableListDataSource
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 100; i += 1) {
  tableListDataSource.push({
    id: `${i}`,
    avatar: 'https://dummyimage.com/50x250',
    name: `张${i}`,
    department: { id: '1', name: '总部' },
    position: 'IT砖家',
    roles: [
      { id: '1', name: '大佬' },
      { id: '2', name: '总裁' },
    ],
    jobNumber: `88${i.toString().padStart(3, '0')}`,
    mobile: `186${i.toString().padStart(8, '0')}`,
    email: `zhang${i}@itcast.cn`,
    createdAt: Date.now(),
  });
}

export default {
  'GET /api/member/list': (req: Request, res: Response) => {
    console.log(req.query, 'GET /api/member/list      query');

    const params: TableListSearchParams = req.query;

    let dataSource = tableListDataSource;

    if (params.name) {
      dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
    }

    let pageSize = 10;
    if (params.pageSize) {
      pageSize = parseInt(`${params.pageSize}`, 0);
    }

    return res.json({
      data: dataSource,
      total: dataSource.length,
      success: true,
      pageSize,
      current: parseInt(`${params.currentPage}`, 10) || 1,
    });
  },
  'PUT /api/member/:id': (req: Request, res: Response) => {
    console.log(req.params, 'PUT /api/member/:id    params');
    console.log(req.body, 'PUT /api/member/:id      body');

    setTimeout(() => {
      res.json({ status: 200 });
    }, 300);
  },
  'DELETE /api/member': (req: Request, res: Response) => {
    console.log(req.query, 'DELETE /api/member     query');

    setTimeout(() => {
      res.json({ status: 200 });
    }, 300);
  },
  'POST /api/member': (req: Request, res: Response) => {
    console.log(req.body, 'POST /api/member');

    setTimeout(() => {
      res.json({ status: 200 });
    }, 300);
  },
};
