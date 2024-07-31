import express from 'express';
import cors from 'cors';
import { Server } from "socket.io";

const app = express(); // create express app

// Configure CORS
app.use(cors({
    origin: 'https://random-group-chat-app.vercel.app', // Allow CORS for this origin
    methods: ['GET', 'POST']
}));

// Explicitly handle CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://random-group-chat-app.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("hiii");
});

const expressServer = app.listen(4000); // Listen on port 4000

// Create socket.io server
const io = new Server(expressServer, {
    cors: {
        origin: 'https://random-group-chat-app.vercel.app', // Allow CORS for this origin
        methods: ['GET', 'POST']
    }
});

// On connection event
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle message from client to server
    socket.on('messageFromClientToServer', newMessage => {
        io.emit('messageFromServerToAllClients', newMessage);
    });

    // Handle disconnect event
    socket.on('disconnect', (reason) => {
        console.log(`User disconnected: ${socket.id}, Reason: ${reason}`);
    });
});
