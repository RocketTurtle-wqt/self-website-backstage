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
      ctx.service.handleArtical.articalHandle(obj);
      ctx.body = "操作完成";
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
}

module.exports = ArticalController;
