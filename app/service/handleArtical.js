'use strict';

const Service = require('egg').Service;
const dateFormat = require('dateformat'); 

class HandleArticalService extends Service {
  async articalHandle(obj) {
    const artical = obj.fields.artical;
    const classify_id = obj.fields.classify_id;
    const name = obj.fields.name;
    console.log('---', classify_id);
    const id = dateFormat(new Date(), "yyyymmddHHMMss");
    let time = new Date().toLocaleDateString().replace(new RegExp("/", "g"), "-");
    const essay = {
      id,
      artical,
      time
    };
    const classify = {
      id: classify_id,
      name,
      essay_id: id
    }
    const result1 = await this.app.mysql.insert('essay', essay);
    const result2 = await this.app.mysql.insert('classify', classify);
  }
}

module.exports = HandleArticalService;
