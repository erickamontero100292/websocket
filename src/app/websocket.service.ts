import {EventEmitter, Injectable, Output} from '@angular/core';
import {IChat} from "./app.component";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  ws!: WebSocket;
  @Output() message = new EventEmitter <IChat>;

  constructor() {
    this.ws = new WebSocket('wss://webskocet.herokuapp.com');
    this.ws.onmessage = (e) => {
      // console.log(e.data);
      this.message.emit(JSON.parse(e.data));
    }
  }

}
