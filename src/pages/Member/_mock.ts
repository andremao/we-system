/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { Request, Response } from 'umi';
import { collections } from '../../utils/mockdb';
import { pagingQueryAPIParams, TableRecord } from './data.d';

export default {
  'GET /api/member/paging': (req: Request, res: Response) => {
    console.log('GET /api/member/paging   req.query:', req.query);

    const { current, pageSize, ...restParams } = (req.query as unknown) as pagingQueryAPIParams;

    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + parseInt(`${pageSize}`, 10);

    const allList = collections.member.getAllList() as TableRecord[];

    let list = [...allList];

    // conditions filter
    if (restParams.name) {
      list = list.filter((v) => v.name.includes(restParams.name));
    }
    if (restParams.department_id) {
      list = list.filter((v) => v.department_id === restParams.department_id);
    }
    if (restParams.position) {
      list = list.filter((v) => v.position.includes(restParams.position));
    }
    if (restParams.job_number) {
      list = list.filter((v) => v.job_number === restParams.job_number);
    }
    if (restParams.mobile) {
      list = list.filter((v) => v.mobile === restParams.mobile);
    }
    if (restParams.email) {
      list = list.filter((v) => v.email === restParams.email);
    }
    // /conditions filter

    const total = list.length;

    list = list.slice(startIndex, endIndex);

    const departments = collections.department.getAllList();
    const roles = collections.role.getAllList();

    list.forEach((v) => {
      if (v.department_id) {
        v.department = departments.find((d) => d.id === v.department_id);
      }
      if (v.role_ids) {
        v.roles = roles.filter((role) => v.role_ids.split(',').includes(role.id));
      }
    });

    res.json({ data: list, total, status: 200, pageSize, current });
  },
  'GET /api/member/all': async (req: Request, res: Response) => {
    const members = collections.member.getAllList() as TableRecord[];

    const departments = collections.department.getAllList();

    members.forEach((v) => {
      if (v.department_id) {
        v.department = departments.find((v1) => v1.id === v.department_id);
      }
    });

    res.json({ status: 200, data: members });
  },
  'POST /api/member': async (req: Request, res: Response) => {
    console.log('POST /api/member   req.body:', req.body);

    collections.member.create(req.body);

    res.json({ status: 200 });
  },
  'PUT /api/member/:id': (req: Request, res: Response) => {
    console.log('PUT /api/member/:id   req.params:', req.params);
    console.log('PUT /api/member/:id   req.body:', req.body);

    collections.member.update({ ...req.params, ...req.body });

    res.json({ status: 200 });
  },
};
