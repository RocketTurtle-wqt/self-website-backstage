'use strict';

const Service = require('egg').Service;
const dateFormat = require('dateformat'); 
const path = require('path');
const fs = require('fs');

class HandlePictureService extends Service {
  async articalPictureHandle(obj) {
    const image = obj.files.image;
    const time = dateFormat(new Date(), "yyyymmddHHMMss");
    const extName = path.extname(image.name);    
    const newName = `${time}_${extName}`;
    const newPath = `/Users/wangqintao/Desktop/self-website-backstage/app/public/images/${newName}`;
    fs.renameSync(image.path, newPath); 
    return `/images/${newName}`;
  }
}

module.exports = HandlePictureService;
