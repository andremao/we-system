// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'WE System',
    locale: true,
    logo: '/logo.png',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          layout: false,
          component: './user/login',
        },
      ],
    },
    {
      name: 'workplace',
      icon: 'desktop',
      path: '/workplace',
      component: './Workplace',
    },
    {
      name: 'department',
      icon: 'apartment',
      path: '/department',
      component: './Department',
    },
    {
      name: 'member',
      icon: 'team',
      path: '/member',
      component: './Member',
    },
    {
      name: 'role',
      icon: 'user-switch',
      path: '/role',
      component: './Role',
    },
    {
      name: 'rights',
      icon: 'key',
      path: '/rights',
      component: './Rights',
    },
    {
      name: 'attendance',
      icon: 'carry-out',
      path: '/attendance',
      component: './Attendance',
    },
    {
      name: 'sign',
      icon: 'audit',
      path: '/sign',
      component: './Sign',
    },
    {
      name: 'approval',
      icon: 'highlight',
      path: '/approval',
      component: './Approval',
    },
    {
      name: 'approval-process-template',
      icon: 'pull-request',
      path: '/approval-process-template',
      component: './ApprovalProcessTemplate',
    },
    {
      path: '/',
      redirect: '/workplace',
    },
    // {
    //   path: '/welcome',
    //   name: 'welcome',
    //   icon: 'smile',
    //   component: './Welcome',
    // },
    // {
    //   path: '/admin',
    //   name: 'admin',
    //   icon: 'crown',
    //   access: 'canAdmin',
    //   component: './Admin',
    //   routes: [
    //     {
    //       path: '/admin/sub-page',
    //       name: 'sub-page',
    //       icon: 'smile',
    //       component: './Welcome',
    //     },
    //   ],
    // },
    // {
    //   name: 'list.table-list',
    //   icon: 'table',
    //   path: '/list',
    //   component: './ListTableList',
    // },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
