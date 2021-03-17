'use strict';

const Controller = require('egg').Controller;
const formidable = require('formidable');

class ArticalController extends Controller {
  async handlePicture() {
    console.log("进入");
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
      ctx.service.handlePicture.articalPictureHandle(obj);
    });
  }

  async handleArtical() {
    console.log("进入");
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
      const rel = ctx.service.handleArtical.articalHandle(obj);
      if (rel) {
        ctx.status = 200;
        ctx.body = "操作完成";
      } else {
        ctx.status = 500;
        ctx.body = "服务器内部错误";
      }
    });
  }

  async getArtical() {
    console.log("进入");
    const { ctx } = this;
    const id = ctx.query.id;
    const essay = await ctx.service.getArtical.getEssay(id);
    console.log(essay);
    ctx.body = essay;
  }

  async getArticals() {
    console.log("按类取文章");
    const { ctx } = this;
    const id = ctx.query.classify_id;
    console.log(`id:${id}`)
    const essays = await ctx.service.getArtical.getEssaysByClassifyId(id);
    console.log(essays);
    ctx.body = essays;
  }
}

module.exports = ArticalController;
