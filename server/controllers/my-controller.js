'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('ab-custom-slug')
      .service('myService')
      .getWelcomeMessage();
  },
});
