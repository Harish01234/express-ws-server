import express from 'express'
import cors from 'cors'

import { Server } from "socket.io";

const app=express() //create express app
// Configure CORS

app.use(cors({
    origin: 'https://random-group-chat-app.vercel.app', // Remove the trailing slash
    methods: ['GET', 'POST']
}));


app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.send("hiii")
})

const experssserver=app.listen(4000)

// Create socket.io server
const io = new Server(expressServer, {
    cors: {
        origin: 'https://random-group-chat-app.vercel.app', // Remove the trailing slash
        methods: ['GET', 'POST']
    }
});
//on is a regular js/node event handler

io.on('connection',(socket)=>{
    // // console.log(socket.handshake);
    // // console.log(socket.id,"has joined our server");

    // socket.emit('welcome',[1,2,3])

    // socket.on('thankyou',(data)=>{
    //     console.log(data);
    // })

    // io.emit('newclient',`a new client joined with id ${socket.id}`)
    socket.on('messageFromClientToServer',newMessage=>{
        // pass through the message to everyone connected
        io.emit('messageFromServerToAllClients',newMessage)
    })

    socket.on('disconnect', (reason) => {
        console.log(`User disconnected: ${socket.id}, Reason: ${reason}`);
    });
})

