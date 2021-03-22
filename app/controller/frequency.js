'use strict';

const Controller = require('egg').Controller;

class FrequecyController extends Controller {
  async getArticalfrequency() {
    const { ctx } = this;
    const rel = await ctx.service.frequency.articalfrequency();
    ctx.status = 200;
    ctx.body = rel;
  }
}

module.exports = FrequecyController;
