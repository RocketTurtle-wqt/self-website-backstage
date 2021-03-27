'use strict';

const Service = require('egg').Service;
const dateFormat = require('dateformat'); 

class GetClassifyService extends Service {

  static resources = {
    cache: {}
  };

  async getClassifies() {
    /*
    考虑eggjs搭建的服务器端的缓存优化
    不让处理请求逻辑一直去操作数据库
    */
    if (GetClassifyService.resources["classifies"]) return GetClassifyService.resources["classifies"];
    const classifies = await this.app.mysql.select("classify");
    GetClassifyService.resources["classifies"] = classifies;
    return classifies;
  }

  async addClassify(obj) {
    const rel = await this.app.mysql.get('classify', { name: obj.fields.name });
    /*
     当增加分类时，重置分类缓存
     */
    GetClassifyService.resources["classifies"] = undefined;
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

  async deleteClassify(id) {
    const { ctx } = this;
    await this.app.mysql.delete('essay', { classify_id: id });
    await this.app.mysql.delete('classify', { id });
    /*
    当删除分类时，重置分类缓存
    */
    GetClassifyService.resources["classifies"] = undefined;
    /*
    同时，去清除对应的handleArtical模块下对应想要删除的分类的缓存
    */
    ctx.service.handleArtical.resetResources(`getArticalsByClassifyId${id}`);
  }
}

module.exports = GetClassifyService;
