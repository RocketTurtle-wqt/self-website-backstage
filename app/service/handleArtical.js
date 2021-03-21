'use strict';

const Service = require('egg').Service;
const dateFormat = require('dateformat');
var sd = require('silly-datetime');

class HandleArticalService extends Service {
  async addArtical(obj) {
    const id = dateFormat(new Date(), "yyyymmddHHMMss");
    const markdown = obj.fields.markdown;
    const artical = obj.fields.artical;
    const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    const title = obj.fields.title;
    const classify_id = obj.fields.classify_id;
    const essay = {
      id,
      markdown,
      artical,
      time,
      title,
      classify_id
    };
    const result = await this.app.mysql.insert('essay', essay);
    return result;
  }

  async deleteArtical(id) {
    await this.app.mysql.delete('essay', { id });
  }
  
  async getArtical(id) {
    const essay = await this.app.mysql.get("essay", { id });
    return essay;
  }

  async getArticalsByClassifyId(id) {
    const essays = await this.app.mysql.select("essay", {      
      where: { classify_id: id }
    });
    return essays;
  }

  async updateArtical(obj) {
    const id = obj.fields.id;
    const markdown = obj.fields.markdown;
    const artical = obj.fields.artical;
    let time = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    const title = obj.fields.title;
    const classify_id = obj.fields.classify_id;
    const essay = {
      id,
      markdown,
      artical,
      time,
      title,
      classify_id
    };
    const result = await this.app.mysql.update('essay', essay); 
    const updateSuccess = result.affectedRows === 1;
    return updateSuccess;
  }

  async getArticalAboutMe() {
    const essay = await this.app.mysql.get("essay", { title:'关于我' });
    return essay;
  }
}

module.exports = HandleArticalService;
