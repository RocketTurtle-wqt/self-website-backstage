'use strict';

const Controller = require('egg').Controller;

class FrequecyController extends Controller {
  async articalfrequency() {
    const { ctx } = this;
    const rel = await ctx.service.frequency.articalfrequency();
    ctx.status = 200;
    ctx.body = rel.slice(Math.max(0, rel.length - 5));
  }
}

module.exports = FrequecyController;
