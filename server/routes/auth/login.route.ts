'use strict';

const Joi = require('joi');
import { login } from '../../controller/auth.controller';

const route = {
  path: '/api/auth/login',
  method: 'POST',
  handler: login,
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
            description: 'Incorrect email or password',
          },
          500: {
            description: 'An internal server error occurred',
          },
        },
      },
    },
    validate: {
      payload: Joi.object({
        email: Joi.string()
          .email({ tlds: { allow: false } })
          .required(),
        password: Joi.string().min(6).max(200).required(),
      }).label('Login'),
    },
  },
};

export = route;
