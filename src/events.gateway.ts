import { SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() wss: Server;
    
    onLines = {}
  
    afterInit(server: Server) {
      console.log('socketio: after init', server);
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      console.log(`socketio connect: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`socketio disconnect: ${client.id}`);
      if(this.onLines[client.id]) {
        let onlineUser = Object.values(this.onLines);
        console.log(onlineUser, 'disconnnect');
        delete this.onLines[client.id];
      }
    }
  
    @SubscribeMessage('onLine')
    handleOnline(client: Socket, text: string): void {
       console.log('join room', text);
       let onlineUser = Object.values(this.onLines);
       client.emit('onLineUsers', onlineUser);
       let user = JSON.parse(text);
       this.onLines[client.id] = user.id;
    }

    


}
      