'use strict';

const Service = require('egg').Service;
const dateFormat = require('dateformat');
var sd = require('silly-datetime');

class HandleArticalService extends Service {
  async articalHandle(obj) {
    const markdown = obj.fields.markdown;
    const artical = obj.fields.artical;
    const classify_id = obj.fields.classify_id;
    const title = obj.fields.title;
    const id = dateFormat(new Date(), "yyyymmddHHMMss");
    let time = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log(time);
    const essay = {
      id,
      markdown,
      artical,
      time,
      title,
      classify_id
    };
    const result = await this.app.mysql.insert('essay', essay);
    if (result) return true;
  }

  async deleteArtical(id) {
    const result = await this.app.mysql.delete('essay', { id });
    if (result) {
      return true;
    }
    else {
      return false;
    }
  }
  
  async getEssay(id) {
    const essay = await this.app.mysql.get("essay", { id });
    return essay;
  }

  async getEssaysByClassifyId(id) {
    const essays = await this.app.mysql.select("essay", {      
      where: { classify_id: id }
    });
    console.log(essays);
    return essays;
  }

  async updateEssay(obj) {
    const markdown = obj.fields.markdown;
    const artical = obj.fields.artical;
    const classify_id = obj.fields.classify_id;
    const title = obj.fields.title;
    const id = dateFormat(new Date(), "yyyymmddHHMMss");
    let time = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log(time);
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
}

module.exports = HandleArticalService;
