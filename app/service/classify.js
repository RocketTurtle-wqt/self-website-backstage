'use strict';

const Service = require('egg').Service;
const dateFormat = require('dateformat'); 

class GetClassifyService extends Service {
  async getClassifies() {
    const classifies = await this.app.mysql.select("classify");
    return classifies;
  }

  async setClassify(obj) {
    const rel = await this.app.mysql.get('classify', { name: obj.fields.name });
    if (!rel) {
      const id = dateFormat(new Date(), "yyyymmddHHMMss");
      await this.app.mysql.insert('classify', {
        id,
        name: obj.fields.name
      });
      return true;
    } else {
      return false;
    }
  }
}

module.exports = GetClassifyService;
