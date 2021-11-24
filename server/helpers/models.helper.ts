const ObjectId = require('mongodb').ObjectID;

export namespace Models {
  export interface Meta {
    createdAt: String;
    modifiedAt: String;
  }
  export interface UserAuth {
    email: String;
    password: String;
    role: String;
    user: typeof ObjectId;
    meta: Meta;
  }
  export interface User {
    firstName: String;
    lastName: String;
    meta: Meta;
  }
}
