'use strict';

const Service = require('egg').Service;

class FrequencyService extends Service {
  async articalfrequency() {
    const essays = await this.app.mysql.select("essay", {});
    let time_array = [],
      mp=new Map();
    for (let essay of essays) {
      let time = essay.time.slice(5,essay.time.indexOf(' '));
      let num = mp.get(time);
      if (num) {
        mp.set(time, num + 1);
      } else {
        mp.set(time, 1);
      }
    }
    for (let [time, num] of mp.entries()) {
      time_array.push({
        time,
        num
      });
    }
    return time_array;
  }
}

module.exports = FrequencyService;
