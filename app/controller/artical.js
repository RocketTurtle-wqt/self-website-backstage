'use strict';

const Controller = require('egg').Controller;
const formidable = require('formidable');

class ArticalController extends Controller {
  async publishPicture() {
    const { ctx } = this;
    const { req } = ctx;
    const form = new formidable.IncomingForm();
    await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        resolve({ fields, files });
      });
    }).then(obj => {
      ctx.service.handlePicture.articalPictureHandle(obj);
    });
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
      const rel = ctx.service.handleArtical.articalHandle(obj);
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
      const rel = ctx.service.handleArtical.updateEssay(obj);
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
    const essay = await ctx.service.handleArtical.getEssay(id);
    ctx.body = essay;
  }

  async getArticalsByClassifyId() {
    const { ctx } = this;
    const id = ctx.query.classify_id;
    const essays = await ctx.service.handleArtical.getEssaysByClassifyId(id);
    ctx.body = essays;
  }

  async deleteArticalById() {
    const { ctx } = this;
    const result = await ctx.service.handleArtical.deleteArtical(ctx.request.body.id);
    ctx.status = 200;
    ctx.body = result;
  }

  async getArticalAboutMe() {
    const { ctx } = this;
    const result = await ctx.service.handleArtical.aboutme();
    ctx.status = 200;
    ctx.body = result;
  }
}

module.exports = ArticalController;
