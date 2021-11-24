const jwt = require('jsonwebtoken');
import { NuxtCookies } from 'cookie-universal-nuxt';
let $cookies: NuxtCookies;

export const decryptJwt = (jsonwebtoken: String, secret: String) => {
  const token = !jsonwebtoken.replace('Bearer ', '').startsWith('Bearer')
    ? jsonwebtoken.replace('Bearer ', '')
    : jsonwebtoken;
  const verifiedToken = jwt.verify(token, secret);

  return verifiedToken;
};
