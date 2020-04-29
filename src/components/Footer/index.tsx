import React from 'react';

import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2006-2020 江苏传智播客教育科技股份有限公司"
    links={[
      {
        key: '传智播客',
        title: '传智播客',
        href: 'http://itcast.cn',
        blankTarget: true,
      },
      {
        key: '黑马程序员',
        title: '黑马程序员',
        href: 'http://itheima.com',
        blankTarget: true,
      },
      {
        key: '传智学院',
        title: '传智学院',
        href: 'http://czxy.com',
        blankTarget: true,
      },
      {
        key: '博学谷',
        title: '博学谷',
        href: 'http://boxuegu.com',
        blankTarget: true,
      },
      {
        key: '传智汇',
        title: '传智汇',
        href: 'http://itczh.com',
        blankTarget: true,
      },
      {
        key: '黑马云课堂',
        title: '黑马云课堂',
        href: 'http://yun.itheima.com',
        blankTarget: true,
      },
      {
        key: '少儿编程',
        title: '少儿编程',
        href: 'http://kudingyu.com',
        blankTarget: true,
      },
    ]}
  />
);
