'use strict';

const Service = require('egg').Service;
const dateFormat = require('dateformat'); 

class HandleArticalService extends Service {
  async articalHandle(obj) {
    const artical = obj.fields.artical;
    const classify_id = obj.fields.classify_id;
    const title = obj.fields.title;
    console.log('---', classify_id);
    const id = dateFormat(new Date(), "yyyymmddHHMMss");
    let time = new Date().toLocaleDateString().replace(new RegExp("/", "g"), "-");
    const essay = {
      id,
      artical,
      time,
      title,
      classify_id
    };
    const result = await this.app.mysql.insert('essay', essay);
    if (result) return true;
  }
}

module.exports = HandleArticalService;
