// imports
const express = require("express"); // import express
const app = express(); // create express app
const http = require("http"); // import http
const { Server } = require("socket.io"); // import socket.io

// initialization
const server = http.createServer(app); // create http server
const cors = require("cors"); // import cors
app.use(cors()); // use cors with

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
}); // create socket.io server

io.on("connection", (socket) => {
  console.log(`a user connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("sensor", (data) => {
    console.log(data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    if (data.room == "") {
      socket.broadcast.emit("receive_message", data);
    } else {
      socket.to(data.room).emit("receive_message", data);
    }
  });
});

server.listen(3001, () => {
  console.log("server is running and listening on port 3001");
});
