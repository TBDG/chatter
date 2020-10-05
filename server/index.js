require('dotenv').config()
const express = require('express');
const socket = require('socket.io')
const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env

//App set up
const app = express();

const server = app.listen(4000, () =>{
    console.log(`Listening for requests on port ${SERVER_PORT}`)
})

//socket setup
const io = socket(server);

io.on('connection', (socket)=>{
    console.log(`Made socket connection ${socket.id}`)

    //handle chat event
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
})
