import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const http = createServer(app);
const io = new Server(http);

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'chattywatty',
    password: 'Ank@1234',
    port: 5432
})


// import mongoose from "mongoose";
// mongoose.connect("mongodb://localhost:27017/chattywatty");
// const chatSchema = new mongoose.Schema({
//   messages: String,
// });
// const Chat = mongoose.model("mesaages", chatSchema);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "chatclient.html"));
});

io.on("connection", async(socket) => {
  console.log("A client is connected: ", socket.id);
//   const chats =  await Chat.find();
//   chats.forEach((chat)=>{
//     socket.emit("chatmessage", chat.messages);
//   })
  socket.on("chatmessage", async(msg) => {
    io.emit("chatmessage", msg);
    await pool.query
  });
  socket.on("disconnect", () => {
    console.log("A client is disconnected: ", socket.id);
  });
});

http.listen(3000);
