import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.customFields.register({
      name: "ab-custom-slug",
      pluginId: "ab-custom-slug",
      type: "string",
      intlLabel: {
        id: "ab-custom-slug.title",
        defaultMessage: "Slug",
      },
      intlDescription: {
        id: "ab-custom-slug.description",
        defaultMessage: "Select a field to display as relational data",
      },
      icon: PluginIcon, // don't forget to create/import your icon component
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "input-component" */ "./components/Input"
          ),
      },
      options: {
        // declare options here
      },
    });
  },

  bootstrap(app) {},

  async registerTrads(app) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
