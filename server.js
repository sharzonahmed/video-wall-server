const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 3000 });

server.on("connection", (socket) => {
  socket.on("message", (msg) => {
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });
});

console.log("WebSocket server running on port 3000");