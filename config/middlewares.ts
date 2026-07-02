export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      // En prod, définir CORS_ORIGINS avec les domaines du front
      // (ex: CORS_ORIGINS=https://lpdwca.fr,https://www.lpdwca.fr)
      origin: env.array('CORS_ORIGINS', ['*']),
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
