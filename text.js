import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'

const app=express()
const http = createServer(app)
const io=new Server(http)

import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, "text.html"))
})

// Socket.IO connection handling for simple chat
io.on('connection', (socket) => {
    console.log('user connected', socket.id)

    // relay chat messages to all clients
    socket.on('chat message', (msg) => {
        const time = new Date().toISOString()
        console.log(`[chat] ${time} ${socket.id}: ${msg}`)
        io.emit('chat message', msg)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
    })
})

const PORT = process.env.PORT || 3000
http.listen(PORT, () => {
    console.log(`text.js server listening on http://localhost:${PORT}`)
})