import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express(); // create express app

// Configure CORS to allow all origins
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.static('public'));

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const expressServer = app.listen(4000, () => {
    console.log('Express server listening on port 4000');
});

// Create socket.io server
const io = new Server(expressServer, {
    cors: {
        origin: '*', // Allow all origins
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
