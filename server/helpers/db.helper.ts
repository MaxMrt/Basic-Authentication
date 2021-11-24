// return database connection
export const getDatabase = async (server) => {
  return server.plugins['hapi-multi-mongo'].mongo.myConn.db(server.app.dbName);
};

export const getClient = async (server) =>  {
  return server.plugins['hapi-multi-mongo'].mongo.myConn;
}