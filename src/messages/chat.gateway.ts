import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('ChatGateway');
  private connectedUsers: { userId: string; socketId: string }[] = [];

  afterInit(server: Server) {
    this.logger.log('Initialized !');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected !: ${client.id}`);
    this.wss.emit('newConnection');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected !: ${client.id}`);
  }

  @SubscribeMessage('addUser')
  addUser(client: Socket, newUser: { userId: string; socketId: string }): void {
    console.log('NEW USER', newUser);

    this.connectedUsers.push({
      userId: newUser.userId,
      socketId: newUser.socketId,
    });
  }

  @SubscribeMessage('removeUser')
  removeUser(client: Socket, userId: string): void {
    this.connectedUsers.filter(user => user.userId !== userId);
  }

  @SubscribeMessage('chatToServer')
  handleMessage(
    client: Socket,
    message: { sender: string; receiverId: string; msg: string },
  ): void {
    console.log('MESSAGE', message);
    const receiverSocketId = this.connectedUsers.find(
      user => user.userId === message.receiverId,
    ).socketId;
    this.wss.to(receiverSocketId).emit('chatToClient', message);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
