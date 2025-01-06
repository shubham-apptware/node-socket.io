const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require('path');

// Configure CORS for Socket.IO
const io = new Server(server, {
    cors: {
        origin: '*', // You can specify allowed origins instead of '*'
        methods: ['GET', 'POST'],
    },
});

io.on("connection", (socket) => {
    console.log('A new user has connected -', socket.id);

    // Capture any message sent to this socket
    socket.onAny((event, ...args) => {
        console.log(`Received event: ${event}`, args);
    });

    // Example specific event handler
    socket.on("chat message", (message) => {
        console.log('got new msg -', message);
        io.emit('chat message', message);
    });
});

// Serve static files
app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
    res.sendFile("public/index.html");
});

server.listen(8080, () => {
    console.log(`Server Started on the port 8080`);
});
