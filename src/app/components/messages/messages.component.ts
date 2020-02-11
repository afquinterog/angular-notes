import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  private msgSubscription: Subscription;
  private msg: String;
  private showSuccessMessage: boolean = false;
  private show: boolean = false;
  private msgTime: number = 3000;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.msgSubscription = this.messageService.msgSubject.subscribe( msg => {
      this.showSuccessMessage = (msg.type == 'success');
      this.msg = msg.content;
      this.show = true;
      this.hide();
    });
  }


  hide(){
    setInterval(() => {
      this.showSuccessMessage = this.show = false;
    }, this.msgTime)
  }

  ngOnDestroy(): void {
    this.msgSubscription.unsubscribe();
  }

}
