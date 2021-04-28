/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1614060775642_4314';

  // add your middleware config here
  config.middleware = [];
    // 数据库配置
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'Wqt197781806',
      // 数据库名
      database: 'self-website',
      timezone: '08:00'
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

   //跨域配置
  // config.security = {
  //   csrf: {
  //     enable: false, // 前后端分离，post请求不方便携带_csrf
  //     ignoreJSON: true
  //   },
  //   domainWhiteList: ['http://192.168.124.7:8080','http://localhost:8080'], //配置白名单
  // };

  config.cors = {
    origin: '*',//匹配规则  域名+端口  *则为全匹配
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    // credentials: true   //专门为 cookie 跨域配置的 
  };

  config.security = {
    csrf: {
      enable: false
    }
  };
  /*
  配置egg项目所占端口号和地址
  */
  config.cluster = {
    listen: {
      path: '',
      port: 7002,
      hostname: '192.168.3.28', 
      // hostname: '172.19.187.203'
    }
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    static: {
      prefix: '/',
      dir: path.join(appInfo.baseDir, 'app/public')
    }
  };


  return {
    ...config,
    ...userConfig,
  };
};
