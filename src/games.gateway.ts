import { SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({namespace: 'games'})
export class GamesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() wss: Server;
  
    afterInit(server: Server) {
      console.log('socketio: after init', server);
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      console.log(`games connect: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
    }
  
    @SubscribeMessage('start')
    handleOnline(client: Socket, text: string): void {
        console.log(text)
    }

    @SubscribeMessage('move')
    handelMove(client: Socket, text: string): void {
        console.log(text)
        client.broadcast.emit('move' , text)
    }
    


}
      