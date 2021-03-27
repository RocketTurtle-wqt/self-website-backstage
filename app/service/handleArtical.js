'use strict';

const Service = require('egg').Service;
const dateFormat = require('dateformat');
var sd = require('silly-datetime');

class HandleArticalService extends Service {

  static resources = {
    cache: {}
  };

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
    /*
    当按分类存取文章时，重置其对应分类的缓存
    */
    this.resetResources(`getArticalsByClassifyId${classify_id}`) = undefined;
    return result;
  }

  async deleteArtical(id) {
    /*
    当删除文章时，重置其对应分类的缓存
     */
    const essay = await this.app.mysql.get("essay", { id });
    await this.app.mysql.delete('essay', { id });
    this.resetResources(`getArticalsByClassifyId${essay.classify_id}`) = undefined;
  }
  
  async getArtical(id) {
    const essay = await this.app.mysql.get("essay", { id });
    return essay;
  }

  async getArticalsByClassifyId(id) {
    /*
    考虑eggjs搭建的服务器端的缓存优化
    不让处理请求逻辑一直去操作数据库
    */
    if (HandleArticalService.resources[`getArticalsByClassifyId${id}`]) return HandleArticalService.resources[`getArticalsByClassifyId${id}`];
    const essays = await this.app.mysql.select("essay", {      
      where: { classify_id: id }
    });
    HandleArticalService.resources[`getArticalsByClassifyId${id}`] = essays;
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
    /*
    当更新分类时，重置其对应分类的缓存
    */
    this.resetResources(`getArticalsByClassifyId${classify_id}`) = undefined;
    return updateSuccess;
  }

  async getArticalAboutMe() {
    const essay = await this.app.mysql.get("essay", { title:'关于我' });
    return essay;
  }

  resetResources(cacheStr) {
    HandleArticalService.resources[cacheStr] = undefined;
  }
}

module.exports = HandleArticalService;
