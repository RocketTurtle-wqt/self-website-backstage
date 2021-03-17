'use strict';

const Controller = require('egg').Controller;
const formidable = require('formidable');

class ClassifyController extends Controller {
  async getClassify() {
    console.log("取得分类");
    const { ctx } = this;
    const classifies = await ctx.service.classify.getClassifies();
    console.log(classifies);
    ctx.body = classifies;
  }

  async setClassify() {
    console.log("增添分类");
    const { ctx } = this;
    const { req } = ctx;
    const form = new formidable.IncomingForm();
    await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        resolve({ fields, files });
      });
    }).then(obj => {
      console.log(obj);
      console.log("微任务");
      ctx.service.classify.setClassify(obj);
    });
  }
}

module.exports = ClassifyController;
