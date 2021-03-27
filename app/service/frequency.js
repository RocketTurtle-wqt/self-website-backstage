'use strict';

const Service = require('egg').Service;
var sd = require('silly-datetime');

class FrequencyService extends Service {
  async articalfrequency() {
    const essays = await this.app.mysql.select("essay", {});
    const time = sd.format(new Date(), 'YYYY-MM-DD');
    const arr = time.split('-');
    let datetime = parseInt(arr[2]);
    let time_arr = [];
    for (let i = 6; i >= 0; i--){
      arr[2] = (datetime - i).toString();
      const str = arr.join('-');
      time_arr.push({
        time: str.slice(5),
        num: this.statistics(essays, str)
      });
      // console.log('time---', str);
      // console.log('num---', this.statistics(essays, str));
    }
    // let time_array = [],
    //   mp=new Map();
    // for (let essay of essays) {
    //   let time = essay.time.slice(5,essay.time.indexOf(' '));
    //   let num = mp.get(time);
    //   if (num) {
    //     mp.set(time, num + 1);
    //   } else {
    //     mp.set(time, 1);
    //   }
    // }
    // for (let [time, num] of mp.entries()) {
    //   time_array.push({
    //     time,
    //     num
    //   });
    // }
    return time_arr;
  }

  async classifyArticalNumber() {
    const classify = await this.ctx.service.classify.getClassifies();
    for (let i = 0; i < classify.length; i++){
      const rel = await this.app.mysql.query(`select count(*) as num from essay where classify_id=${classify[i].id}`);
      classify[i].num = rel[0].num;
    }
    return classify;
  }

  statistics(essays, datetime) {
    let ans = 0;
    for (let essay of essays) {
      let time = essay.time.slice(0, essay.time.indexOf(' '));
      if (time === datetime) {
        ans++;
      }
    }
    return ans;
  }
}

module.exports = FrequencyService;
