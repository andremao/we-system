import { Request, Response } from 'umi';
import mockjs from 'mockjs';
import { TableRecordVO, getListAPIParams } from './data.d';

const departmentAry = [
  { id: '1', name: '传智播客' },
  { id: '1-1', name: '总部' },
  { id: '1-2', name: '北京顺义校区' },
  { id: '1-3', name: '北京昌平校区' },
  { id: '1-4', name: '广州校区' },
  { id: '1-5', name: '上海校区' },
  { id: '1-6', name: '武汉校区' },
  { id: '1-7', name: '深圳校区' },
  { id: '1-8', name: '郑州校区' },
  { id: '1-9', name: '西安校区' },
  { id: '1-10', name: '西安校区' },
  { id: '1-11', name: '哈尔滨校区' },
  { id: '1-12', name: '长沙校区' },
  { id: '1-12-1', name: '长沙校区JavaEE教研部' },
  { id: '1-12-2', name: '长沙校区前端与移动开发教研部' },
  { id: '1-12-3', name: '长沙校区Python教研部' },
  { id: '1-12-4', name: '长沙校区UI UE+全栈设计教研部' },
  { id: '1-12-5', name: '长沙校区校办' },
  { id: '1-12-6', name: '长沙校区财务部' },
  { id: '1-12-7', name: '长沙校区人事行政部' },
  { id: '1-12-8', name: '长沙校区学工部' },
  { id: '1-12-9', name: '长沙校区就业服务部' },
  { id: '1-12-10', name: '长沙校区网络营销部' },
  { id: '1-12-11', name: '长沙校区院校合作部' },
  { id: '1-12-12', name: '长沙校区咨询部' },
  { id: '1-13', name: '济南校区' },
  { id: '1-14', name: '重庆校区' },
  { id: '1-15', name: '南京校区' },
  { id: '1-16', name: '杭州校区' },
  { id: '1-17', name: '成都校区' },
  { id: '1-18', name: '石家庄校区' },
  { id: '1-19', name: '太原校区' },
  { id: '1-20', name: '合肥校区' },
  { id: '1-21', name: '沐阳校区' },
  { id: '1-22', name: '厦门校区' },
  { id: '1-23', name: '沈阳校区' },
  { id: '1-24', name: '天津校区' },
  { id: '1-25', name: '员工服务' },
];

const positionAry = [
  '总裁',
  '校长',
  '财务总监',
  '人事主管',
  '行政主管',
  '讲师',
  '就业指导',
  '班主任',
];

const tableRecords = mockjs.mock({
  'list|100': [
    {
      // 'id|+1': 1,
      id: '@uuid()',
      name: '@cname()',
      jobNumber: '@integer(80000, 89999)',
      'department|1': departmentAry,
      'position|1': positionAry,
      'attendanceList|10': [
        {
          date: '@date("yyyy-MM-dd")',
          'status|1': [1, 2, 3],
        },
      ],
    },
  ],
}).list as TableRecordVO[];

export default {
  'GET /api/attendance': (req: Request, res: Response) => {
    console.log('GET /api/attendance   query:', req.query);

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
      success: true,
      pageSize,
      current,
    });
  },
};
