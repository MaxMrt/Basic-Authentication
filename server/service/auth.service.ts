import { Models } from '../helpers/models.helper';
import UserAuth = Models.UserAuth;
import User = Models.User;
import Meta = Models.Meta;
const moment = require('moment');
const Data = require('../helpers/data.json');

export const getUserAuth = async (
  db: any,
  searchQuery: Object,
  projection: Object
) => {
  const collection = await db.collection(Data.Collections.userAuth);

  try {
    return collection.findOne(searchQuery, projection);
  } catch (e) {
    console.log('The transaction was aborted due to an unexpected error: ' + e);
    return null;
  }
};

export const insertUserOne = async (
  db: any,
  client: any,
  userAuth: UserAuth,
  user: User
) => {
  const userAuthCollection = await db.collection(Data.Collections.userAuth);
  const userCollection = await db.collection(Data.Collections.user);

  const session = client.startSession();
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' },
  };

  let insertedUser = null;
  let insertedUserAuth = null;

  try {
    const transactionResults = await session.withTransaction(async () => {
      insertedUser = await userCollection.insertOne(user, {
        session,
      });
      insertedUser = insertedUser.ops[0];

      // Add meta information
      const meta: Meta = {
        createdAt: moment().utc().format('DD-MM-YYYY HH:mm'),
        modifiedAt: moment().utc().format('DD-MM-YYYY HH:mm'),
      };

      const userAuthUpdated: UserAuth = {
        email: userAuth.email,
        password: userAuth.password,
        role: userAuth.role,
        user: insertedUser._id,
        meta: meta,
      };

      insertedUserAuth = await userAuthCollection.insertOne(userAuthUpdated, {
        session,
      });
    }, transactionOptions);

  } catch (e) {
    console.log('The transaction was aborted due to an unexpected error: ' + e);
    insertedUser = null;
    insertedUserAuth = null;
  } finally {
    await session.endSession();
  }
  return {
    user: insertedUser,
    userAuth: insertedUserAuth,
  };
};
