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
    const socketToRemoveIndex = this.connectedUsers.findIndex(
      user => user.socketId === client.id,
    );
    if (socketToRemoveIndex !== -1) {
      this.connectedUsers.splice(socketToRemoveIndex, 1);
    }

    console.log('CONNECTED USERS ', this.connectedUsers);
  }

  @SubscribeMessage('addUser')
  addUser(client: Socket, newUser: { userId: string; socketId: string }): void {
    console.log('NEW USER', newUser);
    const connectedUser = this.connectedUsers.findIndex(
      user => user.userId === newUser.userId,
    );
    if (connectedUser !== -1) {
      /*User is already connected, Update his socketId*/
      this.connectedUsers[connectedUser].socketId = newUser.socketId;
    } else {
      this.connectedUsers.push({
        userId: newUser.userId,
        socketId: newUser.socketId,
      });
    }
    console.log('CONNECTED USERS ', this.connectedUsers);
  }

  @SubscribeMessage('removeUser')
  removeUser(client: Socket, userId: string): void {
    this.connectedUsers.filter(user => user.userId !== userId);
    console.log('CONNECTED USERS ', this.connectedUsers);
  }

  @SubscribeMessage('chatToServer')
  handleMessage(
    client: Socket,
    message: {
      sender: string;
      receiverId: string;
      msg: string;
      conversationId: string;
    },
  ): void {
    console.log('MESSAGE', message);
    const receiverSocketId = this.connectedUsers.find(
      user => user.userId === message.receiverId,
    ).socketId;

    this.wss.to(receiverSocketId).emit('chatToClient', message);
    //this.wss.emit('chatToClient', message);
  }
}
