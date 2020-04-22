// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { parse } from 'url';
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
    jobNumber: `88${i.toString().padStart(3, '0')}`,
    mobile: `186${i.toString().padStart(8, '0')}`,
    email: `zhang${i}@itcast.cn`,
    createdAt: Date.now(),
  });
}

export default {
  'GET /api/member/list': (req: Request, res: Response, u: string) => {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      // eslint-disable-next-line prefer-destructuring
      url = req.url;
    }

    const params = (parse(url, true).query as unknown) as TableListSearchParams;

    let dataSource = tableListDataSource;

    if (params.name) {
      dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
    }

    let pageSize = 10;
    if (params.pageSize) {
      pageSize = parseInt(`${params.pageSize}`, 0);
    }

    const result = {
      data: dataSource,
      total: dataSource.length,
      success: true,
      pageSize,
      current: parseInt(`${params.currentPage}`, 10) || 1,
    };

    return res.json(result);
  },
  'PUT /api/member/:id': (req: Request, res: Response) => {
    console.log(req.params, 'PUT /api/member/:id params');
    console.log(req.query, 'PUT /api/member/:id query');
    console.log(req.body, 'PUT /api/member/:id body');

    res.json({
      status: 200,
    });
  },
};
