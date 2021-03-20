'use strict';

const Controller = require('egg').Controller;
const formidable = require('formidable');

class ClassifyController extends Controller {
  async getClassify() {
    const { ctx } = this;
    const classifies = await ctx.service.classify.getClassifies();
    ctx.body = classifies;
  }

  async setClassify() {
    const { ctx } = this;
    const { req } = ctx;
    const form = new formidable.IncomingForm();
    let rel = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        resolve({ fields, files });
      });
    }).then(obj => {
      return ctx.service.classify.setClassify(obj);
    });
    if (rel) {
      ctx.status = 200;
      ctx.body = rel;
    } else {
      ctx.status = 409;
      ctx.body = '分类已存在';
    }
  }
}

module.exports = ClassifyController;
