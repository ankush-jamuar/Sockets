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
    res.sendFile(path.join(__dirname, "client1.html"))
})

io.on("connection", (socket)=>{
    console.log("A client is connected")
    const a = setInterval(()=>{
        socket.emit("message", "Hey Client, Good to see you")
    }, 2000);
    setTimeout(()=>{
        clearInterval(a);
    }, 10000);
    socket.on("disconnect", ()=>{
        console.log("A client is diconnected")
    })
    
})

http.listen(3000)