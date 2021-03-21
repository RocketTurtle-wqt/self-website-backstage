'use strict';

const Service = require('egg').Service;
const dateFormat = require('dateformat'); 

class GetClassifyService extends Service {
  async getClassifies() {
    const classifies = await this.app.mysql.select("classify");
    return classifies;
  }

  async addClassify(obj) {
    const rel = await this.app.mysql.get('classify', { name: obj.fields.name });
    if (!rel) {
      const id = dateFormat(new Date(), "yyyymmddHHMMss");
      const classify = {
        id,
        name: obj.fields.name
      };
      await this.app.mysql.insert('classify', classify);
      return classify;
    } else {
      return false;
    }
  }
}

module.exports = GetClassifyService;
