/*global require, module*/

const http = require('http');
const express = require('express');
const expressDebug = require('express-debug');
const swaggerize = require('swaggerize-express');
const freeport = require('freeport');
const open = require('open');

const config = require('./config/config');

var nodeServer = module.exports;
nodeServer.run = function (config) {
  var app = express();

  config.debug && expressDebug(app);

  var api = require('./config/api');
  app.use(swaggerize({
    api: api,
    docspath: '/api-docs',
    handlers: './lib/handlers'
  }));
  app.get('/', function (request, response) {
    response.send('INDEX');
  });
  app.get(api.basePath, function (request, response) {
    response.send(JSON.stringify(api));
  });

  var server = http.createServer(app);
  server.listen(config.port, 'localhost', function () {
    var host = server.address().address + ':' + server.address().port;
    app.swagger.api.host = host;
    console.log(host);
  });
};
nodeServer.bootstrap = function () {
  freeport(function (err, port) {
    if (err) {
      throw err;
    }
    nodeServer.run({
      port: port
    })
  });
};

nodeServer.bootstrap();