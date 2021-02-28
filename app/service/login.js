'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  async login(password) {
    const manager = await this.app.mysql.query("select * from manager","");
    return manager[0].password === password;
  }
}

module.exports = LoginService;
