'use strict';

const Controller = require('egg').Controller;
const formidable = require('formidable');

class ArticalController extends Controller {
  async publishPicture() {
    const { ctx } = this;
    const { req } = ctx;
    const form = new formidable.IncomingForm();
    let rel = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        resolve({ fields, files });
      });
    }).then(obj => {
      return ctx.service.handlePicture.articalPictureHandle(obj);
    });
    ctx.body = rel;
  }

  async publishArtical() {
    const { ctx } = this;
    const { req } = ctx;
    const form = new formidable.IncomingForm();
    await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        resolve({ fields, files });
      });
    }).then(obj => {
      const rel = ctx.service.handleArtical.addArtical(obj);
      if (rel) {
        ctx.status = 200;
        ctx.body = "文章发布成功";
      } else {
        ctx.status = 500;
        ctx.body = "服务器内部错误";
      }
    });
  }

  async updateArticalById() {
    const { ctx } = this;
    const { req } = ctx;
    const form = new formidable.IncomingForm();
    await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        resolve({ fields, files });
      });
    }).then(obj => {
      const rel = ctx.service.handleArtical.updateArtical(obj);
      if (rel) {
        ctx.status = 200;
        ctx.body = "文章更新成功";
      } else {
        ctx.status = 500;
        ctx.body = "文章更新失败";
      }
    });
  }

  async getArticalById() {
    const { ctx } = this;
    const id = ctx.query.id;
    const essay = await ctx.service.handleArtical.getArtical(id);
    ctx.body = essay;
  }

  async getArticalsByClassifyId() {
    const { ctx } = this;
    const id = ctx.query.classify_id;
    const essays = await ctx.service.handleArtical.getArticalsByClassifyId(id);
    ctx.body = essays;
  }

  async deleteArticalById() {
    const { ctx } = this;
    await ctx.service.handleArtical.deleteArtical(ctx.request.body.id);
    ctx.status = 200;
    ctx.body = '文章删除成功';
  }

  async getArticalAboutMe() {
    const { ctx } = this;
    const result = await ctx.service.handleArtical.getArticalAboutMe();
    ctx.status = 200;
    ctx.body = result;
  }
}

module.exports = ArticalController;
