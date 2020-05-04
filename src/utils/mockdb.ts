/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import mockjs from 'mockjs';

const mockdb = low(new FileSync('db/mock-db.json'));

/**
 * 权限表
 */
export interface T_Rights {
  id: string;
  name: string;
  pid: string;
  created_at: string;
}

/**
 * 角色表
 */
export interface T_Role {
  id: string;
  name: string;
  rights_ids: string; // 多个用,分隔
  created_at: string;
}

/**
 * 部门表
 */
export interface T_Department {
  id: string;
  name: string;
  manager_id: string; // 关联成员表id
  pid: string;
  description: string;
  created_at: string;
}

/**
 * 成员表
 */
export interface T_Member {
  id: string;
  name: string;
  department_id: string;
  position: string;
  role_ids: string; // 多个用,分隔
  job_number: string;
  mobile: string;
  email: string;
  created_at: string;
}

/**
 * 审批流程模板表
 */
export interface T_ApprovalProcessTemplate {
  id: string;
  name: string;
  created_at: string;
}

/**
 * 审批表
 */
export interface T_Approval {
  id: string;
  name: string;
  created_at: string;
}

/**
 * 签到表
 */
export interface T_Sign {
  id: string;
  name: string;
  created_at: string;
}

const keys = {
  tables: {
    rights: 't_rights',
    rights__initialized: 't_rights__initialized',
    role: 't_role',
    role__initialized: 't_role__initialized',
    department: 't_department',
    department__initialized: 't_department__initialized',
    member: 't_member',
    member__initialized: 't_member__initialized',
    sign: 't_sign',
    sign__initialized: 't_sign__initialized',
    approvalProcessTemplate: 't_approval_process_template',
    approvalProcessTemplate__initialized: 't_approval_process_template__initialized',
    approval: 't_approval',
    approval__initialized: 't_approval__initialized',
  },
};

export const collections = {
  /**
   * 权限
   */
  rights: {
    getAllList(): T_Rights[] {
      return _.cloneDeep(mockdb.get(keys.tables.rights).value());
    },
    create(rights: T_Rights): Promise<T_Rights> {
      return mockdb
        .get(keys.tables.rights)
        .push({
          ...rights,
          created_at: mockjs.mock('@NOW()'),
          id: mockjs.mock('@GUID()'),
        })
        .last()
        .write();
    },
    update(rights: T_Rights): Promise<void> {
      const { id, ...rest } = rights;
      return mockdb.get(keys.tables.rights).find({ id }).assign(rest).write();
    },
    batchRemove(ids: string[]): Promise<void> {
      return mockdb
        .get(keys.tables.rights)
        .remove((v: T_Rights) => ids.includes(v.id))
        .write();
    },
  },
  /**
   * 角色
   */
  role: {
    getAllList(): T_Role[] {
      return _.cloneDeep(mockdb.get(keys.tables.role).value());
    },
    create(role: T_Role): Promise<T_Role> {
      return mockdb
        .get(keys.tables.role)
        .push({
          id: mockjs.mock('@GUID()'),
          name: role.name,
          rights_ids: role.rights_ids,
          created_at: mockjs.mock('@NOW()'),
        })
        .last()
        .write();
    },
    update(role: T_Role): Promise<void> {
      const { id, ...rest } = role;
      return mockdb.get(keys.tables.role).find({ id }).assign(rest).write();
    },
    remove(ids: string[]): Promise<void> {
      return mockdb
        .get(keys.tables.role)
        .remove((v: T_Role) => ids.includes(v.id))
        .write();
    },
  },
  /**
   * 部门
   */
  department: {
    getAllList(): T_Department[] {
      return _.cloneDeep(mockdb.get(keys.tables.department).value());
    },
    create(department: T_Department): Promise<T_Department> {
      return mockdb
        .get(keys.tables.department)
        .push({
          ...department,
          created_at: mockjs.mock('@NOW()'),
          id: mockjs.mock('@GUID()'),
        })
        .last()
        .write();
    },
    async update(department: T_Department): Promise<void> {
      const { id, ...rest } = department;
      await mockdb.get(keys.tables.department).find({ id }).assign(rest).write();
    },
    remove(ids: string[]): Promise<void> {
      return mockdb
        .get(keys.tables.department)
        .remove((v: T_Role) => ids.includes(v.id))
        .write();
    },
  },
  /**
   * 成员
   */
  member: {
    getAllList(): T_Member[] {
      return _.cloneDeep(mockdb.get(keys.tables.member).value());
    },
    create(member: T_Member): Promise<T_Member> {
      return mockdb
        .get(keys.tables.member)
        .push({
          ...member,
          created_at: mockjs.mock('@NOW()'),
          id: mockjs.mock('@GUID()'),
        })
        .last()
        .write();
    },
    update(member: T_Member): Promise<void> {
      const { id, ...rest } = member;
      return mockdb.get(keys.tables.member).find({ id }).assign(rest).write();
    },
    async batchSetDepartment(memberIds: string, department_id: string): Promise<void> {
      await mockdb
        .get(keys.tables.member)
        .filter((v: any) => v.department_id === department_id)
        .map((v: any) => {
          v.department_id = '';
          return v;
        })
        .write();

      if (memberIds) {
        const memberIdAry = memberIds.split(',');
        await mockdb
          .get(keys.tables.member)
          .filter((v: any) => memberIdAry.includes(v.id))
          .map((v: any) => {
            v.department_id = department_id;
            return v;
          })
          .write();
      }
    },
  },
  /**
   * 签到
   */
  sign: {
    getAllList(): T_Sign[] {
      return _.cloneDeep(mockdb.get(keys.tables.sign).value());
    },
  },
  /**
   * 审批流程模板
   */
  approvalProcessTemplate: {
    getAllList(): T_ApprovalProcessTemplate[] {
      return _.cloneDeep(mockdb.get(keys.tables.approvalProcessTemplate).value());
    },
    create(data: T_ApprovalProcessTemplate): Promise<T_ApprovalProcessTemplate> {
      return mockdb
        .get(keys.tables.approvalProcessTemplate)
        .push({
          ...data,
          created_at: mockjs.mock('@NOW()'),
          id: mockjs.mock('@GUID()'),
        })
        .last()
        .write();
    },
    update(data: T_ApprovalProcessTemplate): Promise<void> {
      const { id, ...restData } = data;
      return mockdb.get(keys.tables.approvalProcessTemplate).find({ id }).assign(restData).write();
    },
    batchRemove(ids: string[]): Promise<void> {
      return mockdb
        .get(keys.tables.approvalProcessTemplate)
        .remove((v: T_ApprovalProcessTemplate) => ids.includes(v.id))
        .write();
    },
  },
  /**
   * 审批
   */
  approval: {
    getAllList(): T_Approval[] {
      return _.cloneDeep(mockdb.get(keys.tables.approval).value());
    },
    create(data: T_Approval): Promise<T_Approval> {
      return mockdb
        .get(keys.tables.approval)
        .push({
          ...data,
          created_at: mockjs.mock('@NOW()'),
          id: mockjs.mock('@GUID()'),
        })
        .last()
        .write();
    },
    update(data: T_Approval): Promise<void> {
      const { id, ...restData } = data;
      return mockdb.get(keys.tables.approval).find({ id }).assign(restData).write();
    },
    batchRemove(ids: string[]): Promise<void> {
      return mockdb
        .get(keys.tables.approval)
        .remove((v: T_Approval) => ids.includes(v.id))
        .write();
    },
  },
};

// 扩展mockjs模板占位符
(() => {
  mockjs.Random.extend({
    role_ids(min: number, max: number) {
      if (mockdb.get(keys.tables.role__initialized).value()) {
        return _.sampleSize(mockdb.get(keys.tables.role).value(), _.random(min, max))
          .map((v) => v.id)
          .join(',');
      }
      return '';
    },
    department_id() {
      if (mockdb.get(keys.tables.department__initialized).value()) {
        const departments = mockdb.get(keys.tables.department).value();
        if (departments.length) {
          return _.sampleSize(departments, 1)[0].id;
        }
      }
      return '';
    },
  });
})();
// /扩展mockjs模板占位符

// 初始化集合数据自执行函数
(() => {
  // 权限
  if (!mockdb.get(keys.tables.rights__initialized).value()) {
    const { list1 } = mockjs.mock({
      'list1|5': [
        {
          id: '@GUID()',
          name: '@CWORD(2,8)',
          pid: '',
          created_at: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
        },
      ],
    });
    const { list2 } = mockjs.mock({
      'list2|10': [
        {
          id: '@GUID()',
          name: '@CWORD(2,8)',
          'pid|1': list1.map((v: any) => v.id),
          created_at: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
        },
      ],
    });
    const { list3 } = mockjs.mock({
      'list3|20': [
        {
          id: '@GUID()',
          name: '@CWORD(2,8)',
          'pid|1': list2.map((v: any) => v.id),
          created_at: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
        },
      ],
    });

    mockdb
      .set(keys.tables.rights__initialized, true)
      .set(keys.tables.rights, [...list1, ...list2, ...list3])
      .write();
  }
  // /权限

  // 角色
  if (!mockdb.get(keys.tables.role__initialized).value()) {
    const { list } = mockjs.mock({
      'list|10': [
        {
          id: '@GUID()',
          name: '@CWORD(2,8)',
          rights_ids: '', // 多个用,分隔
          created_at: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
        },
      ],
    });
    mockdb.set(keys.tables.role__initialized, true).set(keys.tables.role, list).write();
  }
  // /角色

  // 部门
  if (!mockdb.get(keys.tables.department__initialized).value()) {
    const names = [
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

    const ary = names.map((v) => {
      return {
        id: mockjs.mock('@GUID()'),
        name: v,
        manager_id: '',
        pid: '',
        description: mockjs.mock('@CTITLE()'),
        created_at: mockjs.mock('@NOW()'),
      };
    });

    ary.slice(1).forEach((v) => (v.pid = ary[0].id));

    const csAry = ary.filter((v) => v.name.startsWith('长沙校区'));
    csAry.slice(1).forEach((v) => (v.pid = csAry[0].id));

    mockdb.set(keys.tables.department__initialized, true).set(keys.tables.department, ary).write();
  }
  // /部门

  // 成员
  if (!mockdb.get(keys.tables.member__initialized).value()) {
    const { list } = mockjs.mock({
      'list|100': [
        {
          id: '@GUID()',
          name: '@CNAME()',
          department_id: '@DEPARTMENT_ID()',
          position: '@CWORD(2,8)',
          role_ids: '@ROLE_IDS(0,3)', // 多个用,分隔
          'job_number|+1': 80000,
          mobile: /^1[356789]\d{9}$/,
          email: '@EMAIL()',
          created_at: '@NOW()',
        },
      ],
    });

    list.forEach((v: any) => {
      v.job_number += '';
    });

    mockdb.set(keys.tables.member__initialized, true).set(keys.tables.member, list).write();
  }
  // /成员

  // 签到
  if (!mockdb.get(keys.tables.sign__initialized).value()) {
    const { list } = mockjs.mock({
      'list|100': [
        {
          id: '@GUID()',
          name: '@CTITLE()',
          created_at: '@NOW()',
        },
      ],
    });

    mockdb.set(keys.tables.sign__initialized, true).set(keys.tables.sign, list).write();
  }
  // /签到

  // 审批流程模板
  if (!mockdb.get(keys.tables.approvalProcessTemplate__initialized).value()) {
    const { list } = mockjs.mock({
      'list|100': [
        {
          id: '@GUID()',
          name: '@CTITLE()',
          created_at: '@NOW()',
        },
      ],
    });

    mockdb
      .set(keys.tables.approvalProcessTemplate__initialized, true)
      .set(keys.tables.approvalProcessTemplate, list)
      .write();
  }
  // /审批流程模板

  // 审批
  if (!mockdb.get(keys.tables.approval__initialized).value()) {
    const { list } = mockjs.mock({
      'list|100': [
        {
          id: '@GUID()',
          name: '@CTITLE()',
          created_at: '@NOW()',
        },
      ],
    });

    mockdb.set(keys.tables.approval__initialized, true).set(keys.tables.approval, list).write();
  }
  // /审批
})();
