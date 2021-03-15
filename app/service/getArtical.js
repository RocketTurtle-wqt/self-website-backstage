'use strict';

const Service = require('egg').Service;

class GetArticalService extends Service {
  async getEssay(id) {
    const essay = await this.app.mysql.get("essay", { id });
    return essay;
  }

  async getEssaysByClassifyId(id) {
    const essays = await this.app.mysql.select("essay", {      
      where: { classify_id: id }
    });
    return essays;
  }
}

module.exports = GetArticalService;
