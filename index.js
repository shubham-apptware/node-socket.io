const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const WebSocket = require('ws');
const path = require('path');

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('A new user has connected');

    // Listen for messages from the client
    ws.on('message', (data) => {
        const message = data.toString();
        console.log('Received:', message);

        // Broadcast the message to all connected clients except the sender
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle connection close
    ws.on('close', () => {
        console.log('A user has disconnected');
    });
});


// Serve static files
app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'));
});

// Start the server
server.listen(8080, () => {
    console.log(`Server started on port 8080`);
});
