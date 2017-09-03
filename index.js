var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.broadcast.emit('user update', 'user connected');
  
  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
  });
  
  socket.on('typing', function(user){
    socket.broadcast.emit('typing', user);
  });
  
  socket.on('disconnect', function(){
    socket.broadcast.emit('user update', 'user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});