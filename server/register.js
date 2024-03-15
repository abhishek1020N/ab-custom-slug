'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'ab-custom-slug',
    plugin: 'ab-custom-slug',
    type: 'string',
  });
};
