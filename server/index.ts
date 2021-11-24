const Pkg = require('./package');
const Hapi = require('@hapi/hapi');
const DotEnv = require('dotenv');
const pino = require('pino');

// Configure and init logging
const logger = pino({
  prettyPrint: {
    levelFirst: true,
    ignore: 'pid,hostname',
    translateTime: 'dd-mm-yyyy HH:MM:ss.l',
  },
});

// Load environment variables from .env-file into process.env
DotEnv.config();

// Load environment variables
const serverHost = process.env.SERVER_HOST || 'localhost';
const serverPort = process.env.SERVER_PORT || '3000';
const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbPort = process.env.DB_PORT || '27017';
const dbName = process.env.MAIN_DB || 'dbName';
const dbUri = 'mongodb://' + dbHost + ':' + dbPort + '/?replicaSet=myRepl';
// const dbUri = 'mongodb://' + dbHost + ':' + dbPort;

// ######################################################################
// Define Plugins
// ######################################################################

const plugRoutes = {
  plugin: require('hapi-router'),
  options: {
    routes: ['./routes/*/**/**/**/**/**/**/**/*.route.*'],
  },
};

const plugMongo = {
  plugin: require('hapi-multi-mongo'),
  options: {
    connection: {
      uri: dbUri,
      name: 'myConn',
    },
    options: {
      native_parser: false,
      useUnifiedTopology: true,
    },
  },
};

const plugSwagger = {
  plugin: require('hapi-swagger'),
  options: {
    info: {
      title: 'API Documentation',
      version: Pkg.version,
    },
    routeTag: 'api',
    grouping: 'tags',
    payloadType: 'json',
    basePath: '/api/',
    documentationPath: '/documentation',
    schemes: ['http'],
    cors: true,
    swaggerUI: true,
    documentationPage: true,
    reuseDefinitions: false,
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'authorization',
        in: 'header',
      },
    },
  },
};

// ######################################################################
// Initialize a new server object
// ######################################################################

// Configure hapi-server
const server = new Hapi.Server({
  host: process.env.SERVER_HOST || 'localhost',
  port: process.env.SERVER_PORT || '3000',
  routes: {
    cors: {
      origin: ['*'],
      credentials: true,
    },
  },
});

// Provides a place to store server-specific run-time application data
// The data can be accessed whenever the server is accessible.
server.app.serverHost = serverHost;
server.app.baseUrl = process.env.SERVER_BASEURL || 'http://localhost';
server.app.serverPort = serverPort;
server.app.dbUri = dbUri;
server.app.dbName = dbName;
server.app.jwtAccessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || '23748723847235hfwehf239fhewf923hf';
server.app.jwtAccessTokenTime = process.env.ACCESS_TOKEN_TIME || '30d';

// Set auth strategies
server.auth.scheme('userSheme', require('./helpers/shemes/userSheme.helper'));
server.auth.strategy('user', 'userSheme');
server.auth.default('user');

async function start() {
  try {
    // Register plugins

    await server.register([require('@hapi/inert')]);
    logger.info('Server registered @hapi/inert successfully');

    await server.register([require('@hapi/vision')]);
    logger.info('Server registered @hapi/vision successfully');

    await server.register(plugSwagger);
    logger.info('Server registered plugSwagger successfully');

    console.log(plugMongo);
    await server.register(plugMongo);
    logger.info('Server registered plugMongo successfully');

    await server.register(plugRoutes);
    logger.info('Server registered plugRoutes successfully');
  } catch (err) {
    logger.fatal('error: ', err);
  }

  await server.start();
  logger.info(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', (error) => logger.error(error));

start();
