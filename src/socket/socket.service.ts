import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000", // Allow requests from your Next.js client
    methods: ["GET", "POST"],
  },
})
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private onlineUsers: Map<string, string> = new Map(); // userId -> socketId

  handleConnection(client: Socket) {
    client.on("user-connected", (userId: string) => {
      this.onlineUsers.set(userId, client.id);
      // console.log(`User connected: ${userId}`);

      // Broadcast updated list of online users
      this.broadcastOnlineUsers();
    });

    // console.log("Client connected:", client.id);
  }

  handleDisconnect(client: Socket) {
    for (const [userId, socketId] of this.onlineUsers.entries()) {
      if (socketId === client.id) {
        this.onlineUsers.delete(userId);
        // console.log(`User disconnected: ${[...this.onlineUsers.values()]}`);

        // Broadcast updated list of online users
        this.broadcastOnlineUsers();
        break;
      }
    }

    // console.log("Client disconnected:", client.id);
  }

  private broadcastOnlineUsers() {
    // Send the updated list of online users to all connected clients
    const onlineUserIds = Array.from(this.onlineUsers.keys());
    console.log(onlineUserIds);
    this.server.emit("online-users", onlineUserIds);
  }
}
