'use strict';

const Controller = require('egg').Controller;

class FrequecyController extends Controller {
  async getArticalfrequency() {
    const { ctx } = this;
    const rel = await ctx.service.frequency.articalfrequency();
    ctx.status = 200;
    ctx.body = rel;
  }

  async getAllData() {
    const { ctx } = this;
    const articalfrequency = await ctx.service.frequency.articalfrequency();
    const classify = await this.ctx.service.frequency.classifyArticalNumber();
    const rel = {
      articalfrequency,
      classify
    }
    ctx.status = 200;
    ctx.body = rel;
  }
}

module.exports = FrequecyController;
