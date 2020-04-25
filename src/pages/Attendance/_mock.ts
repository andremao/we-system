import { Request, Response } from 'umi';
import mockjs from 'mockjs';
import { TableRecordVO, getListAPIParams } from './data.d';

const departmentNameAry = [
  '传智播客',
  '总部',
  '北京顺义校区',
  '北京昌平校区',
  '广州校区',
  '上海校区',
  '武汉校区',
  '深圳校区',
  '郑州校区',
  '西安校区',
  '西安校区',
  '哈尔滨校区',
  '长沙校区',
  '长沙校区JavaEE教研部',
  '长沙校区前端与移动开发教研部',
  '长沙校区Python教研部',
  '长沙校区UI UE+全栈设计教研部',
  '长沙校区校办',
  '长沙校区财务部',
  '长沙校区人事行政部',
  '长沙校区学工部',
  '长沙校区就业服务部',
  '长沙校区网络营销部',
  '长沙校区院校合作部',
  '长沙校区咨询部',
  '济南校区',
  '重庆校区',
  '南京校区',
  '杭州校区',
  '成都校区',
  '石家庄校区',
  '太原校区',
  '合肥校区',
  '沐阳校区',
  '厦门校区',
  '沈阳校区',
  '天津校区',
  '员工服务',
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
      department: { id: '@uuid()', 'name|1': departmentNameAry },
      'position|1': positionAry,
      'attendanceList|31': [
        {
          date: '@date("yyyy-MM-dd")',
          'status|1': [1, 2, 3], // 1: 正常, 2: 迟到, 3: 缺卡
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
      status: 200,
      pageSize,
      current,
    });
  },
};
