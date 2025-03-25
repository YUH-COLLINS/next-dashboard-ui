import { Server } from "socket.io";

const SocketHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    console.log("Setting up Socket.IO server...");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      // Listen for messages from clients
      socket.on("sendMessage", (message) => {
        // Broadcast the message to all connected clients
        io.emit("receiveMessage", message);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }
  res.end();
};

export default SocketHandler;