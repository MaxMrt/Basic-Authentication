'use strict';

const Joi = require('joi');
import { register } from '../../controller/auth.controller';

const route = {
  path: '/api/auth/register',
  method: 'POST',
  handler: register,
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
            description: 'Successfully authenticated',
          },
          400: {
            description: 'Validation failed.',
          },
          401: {
            description:
              'No authentication credentials provided or authentication failed',
          },
          403: {
            description: 'Authenticated user does not have access',
          },
          409: {
            description: 'Mail is already in use',
          },
          500: {
            description: 'An internal server error occurred',
          },
        },
      },
    },
    validate: {
      payload: Joi.object({
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
        email: Joi.string()
          .email({ tlds: { allow: false } })
          .required(),
        password: Joi.string().min(6).max(200).required(),
      }).label('Register'),
    },
  },
};

export = route;
