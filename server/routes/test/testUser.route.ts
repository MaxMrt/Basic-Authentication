'use strict';

const route = {
  path: '/api/test/credentials/user',
  method: 'GET',
  handler: () => {
    return 'This Route is secrued by user role';
  },
  options: {
    description: 'Test authentication via credentials',
    tags: ['api', 'testing'],
    auth: 'user',
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Successfully retrieved route',
          },
        },
      },
    },
  },
};

export = route;
