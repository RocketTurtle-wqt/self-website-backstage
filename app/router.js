'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/login', controller.login.login);
  router.get('/aboutme', controller.artical.aboutme);
  router.get('/classify_id', controller.artical.getArticals);
  router.get('/classifies', controller.classify.getClassify);
  router.get('/getartical', controller.artical.getArtical);
  router.get('/articalfrequency', controller.frequency.articalfrequency);
  router.post('/picture', controller.artical.handlePicture);
  router.post('/artical', controller.artical.handleArtical);
  router.post('/updateartical', controller.artical.updateArtical);
  router.post('/setClassify', controller.classify.setClassify);
  router.post('/deleteArtical', controller.artical.deleteArtical);
};
