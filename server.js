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
var exportToExcel = require('export-to-excel');
var fs = require('fs');
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

app.use('/test', jsonParser, (req,res) =>{
  console.log(req);
   res.json(req.body);
})

app.use('/ex', jsonParser, (req,res) =>{
  var exportToExcel = require('export-to-excel');
   var filePath = req.body[0].NetID;
var sampleData = [
  {
    "subscribe": 1,
    "openid": req.body[0].NetID,
    "nickname": "name1",
    "sex": 1,
    "language": "zh_CN",
    "city": "杭州",
    "province": "浙江",
    "country": "中国",
    "headimgurl": "http://wx.qlogo.cn/mmopen/s3NiblUuUDR7y3s1DsZibAja25icOumEM4KM79w8pKB5g0o2KKvVDWAqtVuCNVicZIzcqWzOS32ueOvD7tjmRVj2zQ/0",
    "subscribe_time": 1439719607
  },
  {
    "subscribe": 1,
    "openid": "o7Zv3sz92svh2lv_mMg1wewejY0OpU3Q8",
    "nickname": "name2",
    "sex": 1,
    "language": "zh_CN",
    "city": "南京",
    "province": "江苏",
    "country": "中国",
    "headimgurl": "http://wx.qlogo.cn/mmopen/PiajxSqBRaELAI1aEUyI3lwJdMwibicvlkF8ASmIhicSYg3n29v2yHibmum2ibmvedvuXnrziaBl46mnrZe6Cb4pSMaXw/0",
    "subscribe_time": 1431691451
  },
  {
    "subscribe": 0,
    "openid": "o7Zv3s5yjT2MDIICMZkcvcvcvLG71dyBDlg",
    "nickname": "name3",
    "sex": 1,
    "language": "zh_CN",
    "city": "浦东新区",
    "province": "上海",
    "country": "中国",
    "headimgurl": "http://wx.qlogo.cn/mmopen/PiajxSqBRaELt5V5lD4ficPFvT2Z0ZDOHKc26BHh43NXT41WKFQUzLcdtgvBWn1jcqDSac1ib8PpsezuicNVVcbcicA/0",
    "subscribe_time": 1442406029
  }
];
 
 
var sen = exportToExcel.exportXLSX({
    filename: filePath,
    sheetname: '微信粉丝列表',
    title: [
        {
            "fieldName": "subscribe",
            "displayName": "是否关注",
            "cellWidth": 8,
            "type": "bool"  // 1:是  0:否
        },
        {
            "fieldName": "openid",
            "displayName": "OpenID",
            "cellWidth": 30
        },
        {
            "fieldName": "nickname",
            "displayName": "昵称",
            "cellWidth": 15
        },
        {
            "fieldName": "sex",
            "displayName": "性别",
            "cellWidth": 6,
            "type": "sex"  // 1:男  0:女
        },
        {
            "fieldName": "language",
            "displayName": "语言",
            "cellWidth": 8
        },
        {
            "fieldName": "city",
            "displayName": "城市",
            "cellWidth": 12
        },
        {
            "fieldName": "province",
            "displayName": "省",
            "cellWidth": 10
        },
        {
            "fieldName": "country",
            "displayName": "国家",
            "cellWidth": 10
        },
        {
            "fieldName": "headimgurl",
            "displayName": "头像",
            "cellWidth": 20
        },
        {
            "fieldName": "subscribe_time",
            "displayName": "关注时间",
            "cellWidth": 20,
            "type": "datetime"   // 2015-12-12 10:00:00
        }
    ],
    data: sampleData
})
var source = fs.createReadStream(sen);
var dest = fs.createWriteStream('excelFiles/'+sen);

source.pipe(dest);
res.json(true);

})
app.use("/Capture", (req,res) =>{
  var link = req.query.id
  res.download("excelFiles/"+link);
})
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
   console.log(err);		 
    if(results){
  res.json({status: true, data: results}); // results contains rows returned by server		
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
