/* eslint-disable no-param-reassign */
import { Request, Response } from 'umi';
import mockjs from 'mockjs';
import _ from 'lodash';
import { BatchRemoveAPIParams, TableRecordVO, getListAPIParams, Rights, TreeItem } from './data.d';

const sourceData = ((): { flat: Rights[]; tree: Rights[]; tableRecords: TableRecordVO[] } => {
  const { list1 }: { list1: Rights[] } = mockjs.mock({
    'list1|10': [
      {
        id: '@UUID()',
        name: '@CWORD(2,8)',
        pid: '',
        createdAt: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
      },
    ],
  });
  const { list2 }: { list2: Rights[] } = mockjs.mock({
    'list2|30': [
      {
        id: '@UUID()',
        name: '@CWORD(2,8)',
        'pid|1': list1.map((v: Rights) => v.id),
        createdAt: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
      },
    ],
  });
  const { list3 }: { list3: Rights[] } = mockjs.mock({
    'list3|60': [
      {
        id: '@UUID()',
        name: '@CWORD(2,8)',
        'pid|1': list2.map((v: Rights) => v.id),
        createdAt: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
      },
    ],
  });

  const list3OfClone = _.cloneDeep(list3) as TreeItem[];
  const list2OfClone = _.cloneDeep(list2) as TreeItem[];
  const list1OfClone = _.cloneDeep(list1) as TreeItem[];

  list3OfClone.forEach((v) => {
    v.key = v.id;
  });

  list2OfClone.forEach((v) => {
    v.key = v.id;
    v.children = list3OfClone.filter((v1) => v1.pid === v.id);
  });

  list1OfClone.forEach((v) => {
    v.key = v.id;
    v.children = list2OfClone.filter((v1) => v1.pid === v.id);
  });

  const list3OfClone2 = _.cloneDeep(list3) as TableRecordVO[];
  const list2OfClone2 = _.cloneDeep(list2) as TableRecordVO[];
  const list1OfClone2 = _.cloneDeep(list1) as TableRecordVO[];

  list3OfClone2.forEach((v) => {
    v.parent = list2OfClone2.find((v1) => v1.id === v.pid);
  });

  list2OfClone2.forEach((v) => {
    v.parent = list1OfClone2.find((v1) => v1.id === v.pid);
  });

  const tableRecords = [...list1OfClone2, ...list2OfClone2, ...list3OfClone2];

  return { flat: [...list1, ...list2, ...list3], tree: list1OfClone, tableRecords };
})();

let { tableRecords } = sourceData;

export default {
  'GET /api/rights': (req: Request, res: Response) => {
    console.log('GET /api/rights   req.query:', req.query);

    const { current, pageSize, name, pid } = (req.query as unknown) as getListAPIParams;

    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + parseInt(`${pageSize}`, 10);

    let list = [...tableRecords];

    if (name) {
      list = list.filter((v) => v.name.includes(name));
    }

    if (pid) {
      list = list.filter((v) => v.pid === pid);
    }

    res.json({
      data: list.slice(startIndex, endIndex),
      total: list.length,
      status: 200,
      pageSize,
      current,
    });
  },
  'GET /api/rights/tree': (req: Request, res: Response) => {
    res.json({
      status: 200,
      data: sourceData.tree,
    });
  },
  'POST /api/rights': (req: Request, res: Response) => {
    console.log('POST /api/rights   req.body:', req.body);

    res.json({ status: 200 });
  },
  'DELETE /api/rights': (req: Request, res: Response) => {
    console.log('DELETE /api/rights   req.query:', req.query);

    const { ids } = (req.query as unknown) as BatchRemoveAPIParams;

    tableRecords = tableRecords.filter(({ id }) => !ids.includes(id));

    res.json({ status: 200 });
  },
  'PUT /api/rights/:id': (req: Request, res: Response) => {
    console.log('PUT /api/rights/:id   req.params:', req.params);
    console.log('PUT /api/rights/:id   req.body:', req.body);

    res.json({ status: 200 });
  },
};
