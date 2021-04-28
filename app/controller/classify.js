'use strict';

const Controller = require('egg').Controller;
const formidable = require('formidable');

class ClassifyController extends Controller {
  async getClassifies() {
    const { ctx } = this;
    const classifies = await ctx.service.classify.getClassifies();
    ctx.body = classifies;
  }

  async publishClassify() {
    const { ctx } = this;
    const { req } = ctx;
    const form = new formidable.IncomingForm();
    let rel = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        resolve({ fields, files });
      });
    }).then(obj => {
      return ctx.service.classify.addClassify(obj);
    });
    if (rel) {
      ctx.status = 200;
      ctx.body = rel;
    } else {
      ctx.status = 409;
      ctx.body = '分类已存在';
    }
  }

  async deleteClassify() {
    const { ctx } = this;
    const classify_id = ctx.request.body.classify_id;
    await ctx.service.classify.deleteClassify(classify_id);
    ctx.status = 200;
    ctx.body = '分类删除成功';
  }

  async getClassifiesAndArticals() {
    const { ctx } = this;
    const classifiesAndArticals = await ctx.service.classify.getClassifiesAndArticals();
    ctx.status = 200;
    ctx.body = classifiesAndArticals;
  }

  async getClassifyNameById() {
    const { ctx } = this;
    const id = ctx.query.id;
    ctx.status = 200;
    ctx.body = await ctx.service.classify.getClassifyNameById(id);
  }
}

module.exports = ClassifyController;
