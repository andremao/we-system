// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  title: 'WE System',
  favicon:
    'https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/b08baaf5f2db228cf97ce3c5906d169f_121_121.png',
  hash: true,
  antd: {},
  dva: {
    hmr: true,
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
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/workplace',
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
              path: '/department2',
              component: './Department2',
            },
            {
              name: 'member',
              icon: 'team',
              path: '/member2',
              component: './Member2',
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
            //   component: './Admin',
            //   authority: ['admin'],
            //   routes: [
            //     {
            //       path: '/admin/sub-page',
            //       name: 'sub-page',
            //       icon: 'smile',
            //       component: './Welcome',
            //       authority: ['admin'],
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
        },
        {
          component: './404',
        },
      ],
    },
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
