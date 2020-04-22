import { Request, Response } from 'express';

const memberList = [
  {
    id: '1',
    name: '张三疯',
    department: { id: '1', name: '传智播客' },
    position: '代码搬运工',
    jobNumber: '88080',
    mobile: '18600000000',
    email: 'maodun@itcast.cn',
  },
  {
    id: '2',
    name: 'Jim Green',
    department: { id: '1-12', name: '长沙校区' },
    position: '代码搬运工',
    jobNumber: '88081',
    mobile: '18600000001',
    email: 'maodun@itcast.cn',
  },
  {
    id: '3',
    name: 'Andre Mao',
    department: { id: '1-12', name: '长沙校区' },
    position: '代码搬运工',
    jobNumber: '88082',
    mobile: '18600000002',
    email: 'maodun@itcast.cn',
  },
  {
    id: '4',
    name: 'Disabled User',
    department: { id: '1-12', name: '长沙校区' },
    position: '代码搬运工',
    jobNumber: '88083',
    mobile: '18600000003',
    email: 'maodun@itcast.cn',
  },
];

export default {
  'GET /api/member/list': (req: Request, res: Response) => {
    const { name, departmentId, jobNumber, mobile } = req.query;

    let data: any[] = memberList;

    if (name) {
      data = data.filter((v) => v.name.includes(name));
    }

    if (departmentId) {
      data = data.filter((v) => v.department.id === departmentId);
    }

    if (jobNumber) {
      data = data.filter((v) => v.jobNumber.includes(jobNumber));
    }

    if (mobile) {
      data = data.filter((v) => v.mobile.includes(mobile));
    }

    res.json({
      data,
    });
  },
};
