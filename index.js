var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3000, () => console.log('Server started'));
var mangQuangCao = require('./model.js'); //(1)
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));
app.get('/admin', (req, res) => res.render('admin', {mangQuangCao}));

var currentAd = mangQuangCao[0];
io.on('connection', socket => {
  console.log('Co nguoi ket noi');
  socket.emit('SERVER_CHANGE_AD', currentAd);
  socket.on('ADMIN_CHANGE_AD', src => {
    var ad = mangQuangCao.find(e => e.hinh == src);
    currentAd = ad;
    socket.broadcast.emit('SERVER_CHANGE_AD', ad);
  });
});
