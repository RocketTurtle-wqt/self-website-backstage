'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  //重构之前
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/login', controller.login.login);
  // router.get('/getArticalAboutMe', controller.artical.getArticalAboutMe);
  // router.get('/classify_id', controller.artical.getArticalsByClassifyId);
  // router.get('/classifies', controller.classify.getClassifies);
  // router.get('/getartical', controller.artical.getArticalById);
  // router.get('/articalfrequency', controller.frequency.getArticalfrequency);
  // router.post('/picture', controller.artical.publishPicture);
  // router.post('/artical', controller.artical.publishArtical);
  // router.post('/updateartical', controller.artical.updateArticalById);
  // router.post('/deleteArtical', controller.artical.deleteArticalById);
  // router.post('/setClassify', controller.classify.publishClassify);
  
  //重构
  //首页文章aboutme
  /*
    文章
  */
  router.get('/artical/getArticalAboutMe', controller.artical.getArticalAboutMe);
  router.get('/artical/getArticalsByClassifyIdAndPage', controller.artical.getArticalsByClassifyIdAndPage);
  router.get('/artical/getArticalNumberByClassifyId', controller.artical.getArticalNumberByClassifyId);
  router.get('/artical/getArticalById', controller.artical.getArticalById);
  router.post('/artical/publishPicture', controller.artical.publishPicture);
  router.post('/artical/publishArtical', controller.artical.publishArtical);
  router.post('/artical/updateArticalById', controller.artical.updateArticalById);
  router.post('/artical/deleteArticalById', controller.artical.deleteArticalById);
  /*
    分类 
  */
  router.get('/classify/getClassifyNameById', controller.classify.getClassifyNameById);
  router.get('/classify/getClassifies', controller.classify.getClassifies);
  router.get('/classify/getClassifiesAndArticals', controller.classify.getClassifiesAndArticals);
  router.post('/classify/publishClassify', controller.classify.publishClassify);
  router.post('/classify/deleteClassify', controller.classify.deleteClassify);
  /*
    频率
  */
  // router.get('/frequency/getArticalfrequency', controller.frequency.getArticalfrequency);
  router.get('/echarts/getAlldata', controller.frequency.getAllData);
  // router.post('/artical/');
};
