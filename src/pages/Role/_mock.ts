/* eslint-disable no-param-reassign */
import { Request, Response } from 'umi';
import { collections, T_Role } from '../../utils/mockdb';
import {
  BatchRemoveAPIParams,
  CreateAPIParams,
  getListAPIParams,
  TableRecordVO,
  UpdateAPIParams,
} from './data.d';

export default {
  'GET /api/role': (req: Request, res: Response) => {
    console.log('GET /api/role   query:', req.query);

    const { current, pageSize, name } = (req.query as unknown) as getListAPIParams;

    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + parseInt(`${pageSize}`, 10);

    let list = collections.role.getAllList() as TableRecordVO[];

    if (name) {
      list = list.filter((v) => v.name.includes(name));
    }

    const total = list.length;

    list = list.slice(startIndex, endIndex);

    const rightsAllList = collections.rights.getAllList();

    list.forEach((v) => {
      if (!v.rights_ids) {
        v.rightsList = [];
      } else {
        const ids = v.rights_ids.split(',');
        v.rightsList = rightsAllList.filter(({ id }) => ids.includes(id));
      }
    });

    res.json({
      data: list,
      total,
      status: 200,
      pageSize,
      current,
    });
  },
  'POST /api/role': async (req: Request, res: Response) => {
    console.log('POST /api/role    body:', req.body);

    const { name, rights_ids } = req.body as CreateAPIParams;

    const role = await collections.role.create({
      name,
      rights_ids: rights_ids.join(','),
    } as T_Role);

    res.json({ status: 200, data: role });
  },
  'DELETE /api/role': (req: Request, res: Response) => {
    console.log('DELETE /api/role   query:', req.query);

    const { ids } = (req.query as unknown) as BatchRemoveAPIParams;

    collections.role.remove(ids);

    res.json({ status: 200 });
  },
  'PUT /api/role/:id': (req: Request, res: Response) => {
    console.log('PUT /api/role/:id   params:', req.params);
    console.log('PUT /api/role/:id   body:', req.body);

    const params = { ...req.params, ...req.body } as UpdateAPIParams;

    collections.role.update({
      id: params.id,
      name: params.name,
      rights_ids: params.rights_ids.join(','),
      created_at: '',
    });

    res.json({ status: 200 });
  },
};
