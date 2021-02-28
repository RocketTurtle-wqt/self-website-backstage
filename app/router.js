'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/login', controller.login.login);
  router.get('/getartical', controller.artical.getArtical);
  router.post('/picture', controller.artical.handlePicture);
  router.post('/artical', controller.artical.handleArtical);
};
