// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { TableListItem, TableListParams } from './data.d';

// mock tableListDataSource
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    id: i,
    name: `xx部门 ${i}`,
    status: Math.floor(Math.random() * 10) % 2,
    desc: '这是一段描述',
    createdAt: Date.now(),
    pid: null,
  });
}

// function getRule(req: Request, res: Response, u: string) {
//   let url = u;
//   if (!url || Object.prototype.toString.call(url) !== '[object String]') {
//     // eslint-disable-next-line prefer-destructuring
//     url = req.url;
//   }

//   const params = (parse(url, true).query as unknown) as TableListParams;

//   let dataSource = tableListDataSource;

//   if (params.sorter) {
//     const s = params.sorter.split('_');
//     dataSource = dataSource.sort((prev, next) => {
//       if (s[1] === 'descend') {
//         return next[s[0]] - prev[s[0]];
//       }
//       return prev[s[0]] - next[s[0]];
//     });
//   }

//   if (params.status) {
//     const status = params.status.split(',');
//     let filterDataSource: TableListItem[] = [];
//     status.forEach((s: string) => {
//       filterDataSource = filterDataSource.concat(
//         dataSource.filter((item) => {
//           if (parseInt(`${item.status}`, 10) === parseInt(s.split('')[0], 10)) {
//             return true;
//           }
//           return false;
//         }),
//       );
//     });
//     dataSource = filterDataSource;
//   }

//   if (params.name) {
//     dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
//   }

//   let pageSize = 10;
//   if (params.pageSize) {
//     pageSize = parseInt(`${params.pageSize}`, 0);
//   }

//   const result = {
//     data: dataSource,
//     total: dataSource.length,
//     success: true,
//     pageSize,
//     current: parseInt(`${params.currentPage}`, 10) || 1,
//   };

//   return res.json(result);
// }

export default {
  'GET /api/department': (req: Request, res: Response) => {
    const params = req.query as TableListParams;

    res.json({
      data: tableListDataSource,
      total: tableListDataSource.length,
      success: true,
      pageSize: params.pageSize || 10,
      current: params.currentPage || 1,
    });
  },
  'POST /api/department': {},
};
