const http = require('http')
const express = require('express');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

io.on("connection",(socket)=> {
    console.log('A new user has connected -',socket.id);

    socket.on("chat message",(message)=>{
        console.log('got new msg -',message);
        io.emit('chat message', message);
    })
});

app.use(express.static(path.resolve('./public')))

app.get('/',(req, res)=>{
    res.sendFile("public/index.html")
})


server.listen(8080,()=>{
    console.log(`Server Started on the port 8080`);
})