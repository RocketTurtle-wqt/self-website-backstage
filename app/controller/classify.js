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
    const rel = false;
    await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        resolve({ fields, files });
      });
    }).then(obj => {
      console.log(obj);
      console.log("微任务");
      (async function handle() {
        rel = await ctx.service.classify.setClassify(obj);
      })();
    });
    if (rel) {
      ctx.status = 200;
    } else {
      console.log('失败');
      ctx.status = 409;
      ctx.body = '分类已存在';
    }
  }
}

module.exports = ClassifyController;
