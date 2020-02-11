import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Message } from '../models/message.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService{

    messages : Message[] = [];
    msgSubject = new Subject<Message>();
    
    constructor(){
    }

    success(message){
        this.msgSubject.next({type: 'success', content: message});
    }

    error(message){
        this.msgSubject.next({type: 'error', content: message});
    }

}