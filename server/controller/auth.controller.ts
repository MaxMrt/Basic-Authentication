"use strict";

import * as Hapi from "@hapi/hapi";
import { getDatabase, getClient } from "../helpers/db.helper";
import { getUserAuth, insertUserOne } from "../service/auth.service";
import { Models } from "../helpers/models.helper";
import UserAuth = Models.UserAuth;
import User = Models.User;
import Meta = Models.Meta;
const sanitize = require("mongo-sanitize");
const moment = require("moment");
const Bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectID;
const Jwt = require("jsonwebtoken");
import { decryptJwt } from "../helpers/auth.helper";

/**
 * @param req Request object
 * @param h Handler of the response
 */
export const login = async (req: any, h: Hapi.ResponseToolkit) => {
  //Retrieve user input and set default values
  let { email, password } = req.payload;

  // Sanitize user input
  email = sanitize(email);
  password = sanitize(password);

  // Get userAuth from DB
  const db = await getDatabase(req.server);
  let userAuth = await getUserAuth(db, { email: email }, {});
  if (!userAuth) return h.response("Incorrect email or password").code(409);

  // Check if the password matches
  if (!(await Bcrypt.compare(password, userAuth.password))) {
    return h.response("Incorrect email or password").code(409);
  }

  // Set user scope
  userAuth.scope = [userAuth.role];

  // Create and assign a new access token
  const accessToken = Jwt.sign(
    { _id: userAuth._id, browserId: req.info.id, scope: userAuth.scope },
    req.server.app.jwtAccessTokenSecret
  );

  return h
    .response({
      token: accessToken,
      user: userAuth,
    })
    .code(200);
};

/**
 * @param req Request object
 * @param h Handler of the response
 */
export const register = async (req: any, h: Hapi.ResponseToolkit) => {
  //Retrieve user input and set default values
  let { email, password }: UserAuth = req.payload;
  let { firstName, lastName }: User = req.payload;

  // Sanitize user input
  email = sanitize(email).toLowerCase();
  password = sanitize(password);
  firstName = sanitize(firstName);
  lastName = sanitize(lastName);

  // Check if the user exists
  const db = await getDatabase(req.server);
  const client = await getClient(req.server);
  let authAccount = await getUserAuth(db, { email: email }, { email: 1 });
  if (authAccount) return h.response("Mail is already in use").code(409);

  // Hash password
  const hashedPassword = Bcrypt.hashSync(password, Bcrypt.genSaltSync(10));

  // Add meta information
  const meta: Meta = {
    createdAt: moment().utc().format("DD-MM-YYYY HH:mm"),
    modifiedAt: moment().utc().format("DD-MM-YYYY HH:mm"),
  };

  // Insertion
  const userAuth: UserAuth = {
    email: email,
    password: hashedPassword,
    role: "user",
    user: "",
    meta: meta,
  };
  const user: User = { firstName: firstName, lastName: lastName, meta: meta };
  const data = await insertUserOne(db, client, userAuth, user);
  if (!data) {
    return h.response("Internal Server Error").code(503);
  }

  // Return values
  return h.response(data).code(201);
};

/**
 * @param req Request object
 * @param h Handler of the response
 */
export const validate = async (req: any, h: Hapi.ResponseToolkit) => {
  //Retrieve user input and set default values
  let { token } = req.payload;
  let decryptedToken;

  // Sanitize user input
  token = sanitize(token);

  // Check if token is still valid
  try {
    decryptedToken = decryptJwt(token, req.server.app.jwtAccessTokenSecret);
  } catch (err) {
    return h
      .response("Token is not valid anymore or could not be processed")
      .code(409)
      .takeover();
  }

  // Get userAuth from DB
  const db = await getDatabase(req.server);
  let userAuth = await getUserAuth(
    db,
    { _id: ObjectId(decryptedToken._id) },
    {}
  );
  if (!userAuth) return h.response("Could not get user information").code(409);

  // Set user scope
  userAuth.scope = [userAuth.role];

  return h
    .response({
      token: token,
      user: userAuth,
    })
    .code(200);
};
