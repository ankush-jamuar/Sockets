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
    res.sendFile(path.join(__dirname, "chatclient.html"))
})

io.on("connection", (socket)=>{
    console.log("A client is connected: ", socket.id)
    socket.on("chatmessage", (msg)=>{
        io.emit("chatmessage", msg)
    })
    socket.on("disconnect", ()=>{
        console.log("A client is disconnected: ",socket.id)
    })
})

http.listen(3000)