'use strict';
const http = require('http'),
      path = require('path'),
      express = require('express'),
      bodyParser = require('body-parser'),
      fileUtils = require('./utils/fileUtils'),
      sendMail = require('./utils/sendMail'),
      app = express(),
      router = express.Router(),
      port = 8080;
//console.log('fileUtils', fileUtils.read);
// Parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Send static files
app.use('/', express.static(__dirname));

// Handle order request
app.post('/sendOrder', function(req, res) {
  console.log('order sent ', req.body);
  const data = fileUtils.writeNewClient(__dirname + '/data/orders.txt', req.body);
  const mail = sendMail(data);
  mail
    .then(() => res.send('ok'))
    .catch(() => res.send('email sending error'));
});

// Handle get request pages those don't exist
app.get('*', function(req, res) {
  // If get request is not an index file then we tell that the page doesn't exist
  if (req.url !== 'index.html' & req.url !== '/') {
    res.send('<h1 style="text-align:center">Ошибка 404</h1><p style="text-align:center">Такой страницы не существует.<br><a href="/">Вернуться на главную</a></p>');
    console.log('Requested page on the url', req.url, 'doesn\'t exist');
  }
});

// Handle post request
app.post('*', function(req, res) {
  // If post request is not /sendOrder then we tell that the page doesn't exist
  if (req.url !== '/sendOrder') {
    res.send('<h1 style="text-align:center">Ошибка 404</h1><p style="text-align:center">Такой страницы не существует.<br><a href="/">Вернуться на главную</a></p>');
  }
});

// Create server
const httpServer = http.createServer(app);

// Listening port
httpServer.listen(port, function() {
  console.log('Listening ' + port +' port');
});
