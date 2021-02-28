'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    const { ctx } = this;
    const password = ctx.query.password;
    const result = await ctx.service.login.login(password);
    if (result) {
      ctx.cookies.set('username', 'rocket', {
        maxAge: 1000 * 3600 * 3,
        //先禁止cookie被所有的第三方脚本所使用
        httpOnly: true,
        domain:'192.168.124.7'
      });
      // ctx.cookies.set('username', null);
      ctx.body = true;
    } else {
      ctx.body = false;
    }
  }
}

module.exports = LoginController;
