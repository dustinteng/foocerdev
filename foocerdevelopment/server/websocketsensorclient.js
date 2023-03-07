// socket io client example
// // Import the Socket.IO client library
const { io } = require("socket.io-client");
// Connect to the server
const socket = io("https://localhost:3001");

// Send data to the 'sensor' topic every 5 seconds
setInterval(function () {
  socket.emit("sensor", "Hello Server!");
}, 5000);

// Listen for messages
socket.on("message", function (data) {
  console.log("Message from server:", data);
});

// Listen for errors
socket.on("error", function (error) {
  console.error("Socket.IO error:", error);
});

// Connection closed
socket.on("disconnect", function () {
  console.log("Socket.IO connection closed");
});
