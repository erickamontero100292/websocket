import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {WebsocketService} from "./websocket.service";
import {MatDialog} from "@angular/material/dialog";
import {AlertComponent} from "./alert/alert.component";

export interface IChat {

  text: string;
  date: Date | string;
  name: string;

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'websocket';

  messageList: IChat[]=[];

  modelForm = this._fb.group({
    message: ['', [Validators.required]]
  });
  constructor(private _fb: FormBuilder, private websocketService: WebsocketService, private dialog: MatDialog) {

  }

  send() {
  console.log(this.modelForm.value.message);
  this.dialog.open(AlertComponent);

    var chat = {} as IChat;
    chat.text = <string>this.modelForm.value.message;
    chat.date = new Date;
    chat.name ='eamontero';
    this.messageList.push(chat);
    this.websocketService.ws.send(JSON.stringify(chat));
    this.modelForm.reset();
  }

  ngOnInit(): void {

    this.websocketService.message.subscribe((message )=>{
      console.log('Desde el componente: ' + message);
      var chat = {} as IChat;
      chat.text = message.text;
      chat.date = new Date;
      chat.name= message.name;
      this.messageList.push(chat);
    });
  }
}
