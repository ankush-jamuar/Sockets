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
    res.sendFile(path.join(__dirname, "broadcast.html"))
})

let clients = 0;
io.on("connection", (socket)=>{
    clients++;
    io.emit("broadcast", `${clients} clients connected`)
    socket.on("disconnect", ()=>{
        clients--;
        io.emit("broadcast", `${clients} clients connected`)
    })
})

http.listen(3000)