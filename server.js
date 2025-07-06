const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 3000 });

let master = null;

server.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (msg) => {
    if (msg === "set-master") {
      master = socket;
      console.log("Master set");
      return;
    }

    // Only broadcast if the master is sending
    if (socket === master) {
      server.clients.forEach((client) => {
        if (client !== master && client.readyState === WebSocket.OPEN) {
          client.send(msg);
        }
      });
    }
  });

  socket.on("close", () => {
    if (socket === master) {
      master = null;
      console.log("Master disconnected");
    }
  });
});

console.log("WebSocket server running on port 3000");
