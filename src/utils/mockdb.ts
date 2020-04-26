/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import mockjs from 'mockjs';

const mockdb = low(new FileSync('db/mock-db.json'));

export interface T_Role {
  id: string;
  name: string;
  rights_ids: string; // 多个用,分隔
  createdAt: string;
}

export interface T_Rights {
  id: string;
  name: string;
  pid: string;
  createdAt: string;
}

const keys = {
  tables: {
    role: 't_role',
    role__initialized: 't_role__initialized',
    rights: 't_rights',
    rights__initialized: 't_rights__initialized',
  },
};

export const collections = {
  role: {
    getAllList(): T_Role[] {
      return _.cloneDeep(mockdb.get(keys.tables.role).value());
    },
    remove(ids: string[]): void {
      mockdb
        .get(keys.tables.role)
        .remove((v: T_Role) => ids.includes(v.id))
        .write();
    },
    create(role: T_Role): Promise<T_Role> {
      return mockdb
        .get(keys.tables.role)
        .push({
          id: mockjs.mock('@GUID()'),
          name: role.name,
          rights_ids: role.rights_ids,
          createdAt: mockjs.mock('@NOW()'),
        })
        .last()
        .write();
    },
    update(role: T_Role): void {
      const { id, createdAt, ...rest } = role;
      mockdb.get(keys.tables.role).find({ id }).assign(rest).write();
    },
  },
  rights: {
    getAllList(): T_Rights[] {
      return _.cloneDeep(mockdb.get(keys.tables.rights).value());
    },
    setAllList(list: T_Rights[]): void {
      mockdb.set(keys.tables.rights, list).write();
    },
  },
};

// [ 角色集合
if (!mockdb.get(keys.tables.role__initialized).value()) {
  const { list } = mockjs.mock({
    'list|10': [
      {
        id: '@GUID()',
        name: '@CWORD(2,8)',
        rights_ids: '', // 多个用,分隔
        createdAt: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
      },
    ],
  });
  mockdb.set(keys.tables.role__initialized, true).set(keys.tables.role, list).write();
}
// ] 角色集合

// [ 权限集合
if (!mockdb.get(keys.tables.rights__initialized).value()) {
  const { list1 } = mockjs.mock({
    'list1|5': [
      {
        id: '@GUID()',
        name: '@CWORD(2,8)',
        pid: '',
        createdAt: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
      },
    ],
  });
  const { list2 } = mockjs.mock({
    'list2|10': [
      {
        id: '@GUID()',
        name: '@CWORD(2,8)',
        'pid|1': list1.map((v: any) => v.id),
        createdAt: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
      },
    ],
  });
  const { list3 } = mockjs.mock({
    'list3|20': [
      {
        id: '@GUID()',
        name: '@CWORD(2,8)',
        'pid|1': list2.map((v: any) => v.id),
        createdAt: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
      },
    ],
  });

  mockdb
    .set(keys.tables.rights__initialized, true)
    .set(keys.tables.rights, [...list1, ...list2, ...list3])
    .write();
}
// ] 权限集合
