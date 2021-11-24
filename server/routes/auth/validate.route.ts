'use strict';

const Joi = require('joi');
import { validate } from '../../controller/auth.controller';

const route = {
  path: '/api/auth/validate',
  method: 'POST',
  handler: validate,
  options: {
    auth: false,
    // description: '',
    // notes: '',
    tags: ['api', 'user'],
    plugins: {
      'hapi-swagger': {
        security: ['apiKey'],
        responses: {
          201: {
            description: 'Successfully validated',
          },
          409: {
            description: 'Token is not valid anymore',
          },
          500: {
            description: 'An internal server error occurred',
          },
        },
      },
    },
    validate: {
      payload: Joi.object({
        token: Joi.string().required(),
      }).label('Jwt Token'),
    },
  },
};

export = route;
