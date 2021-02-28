'use strict';

const Service = require('egg').Service;
const dateFormat = require('dateformat'); 

class HandleArticalService extends Service {
  async articalHandle(obj) {
    const artical = obj.fields.artical;
    const id = dateFormat(new Date(), "yyyymmddHHMMss");
    let time = new Date().toLocaleDateString().replace(new RegExp("/", "g"), "-");
    let essay = {
      id,
      artical,
      time
    };
    const result = await this.app.mysql.insert('essay', essay);
  }
}

module.exports = HandleArticalService;
