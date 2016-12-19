var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3000, () => console.log('Server started'));
var {query, addClick} = require('./db.js');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));
app.get('/admin', (req, res) => {
  query('SELECT * FROM "Ad"', (err, result) => {
    res.render('admin', {mangQuangCao: result.rows})
  });
});
var currentImage;
//var currentAd = mangQuangCao[0];
io.on('connection', socket => {
  console.log('Co nguoi ket noi');
  //socket.emit('SERVER_CHANGE_AD', currentAd);
  query(`SELECT * FROM "Ad" WHERE hinh='${currentImage}'`, (err, result) =>{
    socket.emit('SERVER_CHANGE_AD', result.rows[0]);
  })
  socket.on('ADMIN_CHANGE_AD', src => {
    currentImage = src;
    // var ad = mangQuangCao.find(e => e.hinh == src);
    // currentAd = ad;
    // socket.broadcast.emit('SERVER_CHANGE_AD', ad);
    query(`SELECT * FROM "Ad" WHERE hinh='${src}'`, (err, result) =>{
      socket.broadcast.emit('SERVER_CHANGE_AD', result.rows[0]);
    })
  });
});
