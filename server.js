/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');
const mac = require('getmac');
var mysql = require('mysql2');
var bodyParser = require('body-parser');
var textParser = bodyParser.text();

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./server/middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();
const getMac = (req,res) => {
    mac.getMac((err,macAddress) => {
      err = err == true ? res.json(err) : false;
    res.json(macAddress);
   })
}
 
// If you need a backend, e.g. an API, add your custom backend-specific middleware here
app.use('/ap', (req,res) => {
  getMac(req,res)
});

app.use('/api', textParser, (req,res) =>{
  var connection = mysql.createConnection({host:'130.18.123.15', user: 'web_dev', password: '123456', database: 'test'});
  var query = "SELECT * FROM students WHERE NetID="+ "'"+req.body+"'";
  connection.query(query, function (err, results) {
  res.json(results); // results contains rows returned by server 
  connection.end();
  res.end();
  });
})

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});
