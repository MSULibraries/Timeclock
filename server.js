/* eslint consistent-return:0 */

const express = require('express');
var request = require('request');
const logger = require('./logger');
const mac = require('getmac');
var session = require('express-session');
var ConnectCas = require('connect-cas2');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MemoryStore = require('session-memory-store')(session);
const argv = require('minimist')(process.argv.slice(2));
const setup = require('./server/middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
var jwt = require('jsonwebtoken');
var mysql = require('mysql2');
var textParser = bodyParser.text()
var jsonParser = bodyParser.json()
const app = express();

const getMac = (req,res) => {
    mac.getMac((err,macAddress) => {
      err = err == true ? res.json(err) : false;
    res.json(macAddress);
   })
}

app.use(cookieParser());
app.use(session({
  name: 'NSESSIONID',
  secret: 'Hello I am a long long long secret',
  store: new MemoryStore()  // or other session store 
}));


var casClient = new ConnectCas({
  debug: true,
    ignore: [
      /\/ignore/
    ],
    match: [],
    servicePrefix: 'http://130.18.249.246:3000',
    serverPath: 'https://testcas.its.msstate.edu/cas',
    paths: {
      validate: '/login',
      serviceValidate: 'https://testcas.its.msstate.edu/cas/serviceValidate',
      login: '/login',
      logout: '/logout',
      restletIntegration: 'https://testcas.its.msstate.edu/cas/serviceValidate'
    },
    redirect: false,
    gateway: false,
    renew: false,
    slo: true,
    cache: {
      enable: false,
      ttl: 5 * 60 * 1000,
      filter: []
    },
    fromAjax: {
      header: 'x-client-ajax',
      status: 418
    }
});


app.use("/login",(req,res) => {
  request('https://testcas.its.msstate.edu/cas/serviceValidate?service=http://130.18.249.246:3000/login&ticket='+req.param('ticket'), function (error, response, body) {
    var user = response.body;
    var userIndex1 = user.search("<cas:user>") + 10;
    var userIndex2 = user.search("</cas:user>");
    var currentUser = user.slice(userIndex1, userIndex2);
    var token = jwt.sign({ user: currentUser }, 'shhhhhhared-secret');
    res.redirect('/?'+token);
  }) 
});
app.use('/verify',textParser,function(req, res) {
    var decoded = jwt.verify(req.body, 'shhhhhhared-secret');
    res.json(decoded);
});
 
app.use("/cas",casClient.core());
app.get('/logout', casClient.logout());
 
// NOTICE: If you want to enable single sign logout, you must use casClient middleware before bodyParser. 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// If you need a backend, e.g. an API, add your custom backend-specific middleware here
app.use('/ap', (req,res) => {
  getMac(req,res)
});

 
 app.use('/db', textParser, (req,res) =>{		
  var connection = mysql.createConnection({host:'130.18.123.15', user: 'web_dev', password: '123456', database: 'test'});		 		
  connection.query(req.body, function (err, results) {
    console.log(results);
    console.log(results.affectedRows);
    console.log(err);		 
    if(results.affectedRows > 0 || results.length > 0){
  res.json(true); // results contains rows returned by server		
    }
    else{
      res.json(false);
    }	
   });
   connection.end();		
 });
 
app.use('/api', (req,res) =>{
 res.json({ user: req.query.NetID });
});

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
