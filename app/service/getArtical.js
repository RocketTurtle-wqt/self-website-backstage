'use strict';

const Service = require('egg').Service;

class GetArticalService extends Service {
  async getEssay(id) {
    const essay = await this.app.mysql.get("essay", { id });
    return essay;
  }
}

module.exports = GetArticalService;
