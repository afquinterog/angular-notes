import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  notes : Note[] = [];
  private msgSubscription: Subscription;
  private titleOrderAsc: boolean = true;
  private dateOrderAsc: boolean = true;
  
  constructor(private notesService: NotesService,
              private messageService: MessageService){

  }

  ngOnInit() {
    this.update();

    this.msgSubscription = this.messageService.msgSubject.subscribe( msg => {
      if(msg.type != 'error'){
        this.update();   
      }
    });
  }

  ngOnDestroy(): void {
    this.msgSubscription.unsubscribe();
  }

  update(){
    this.notesService
      .get()
      .subscribe( notes => {
        this.notes = notes;
      }, error => {
        this.messageService.error("Server not available");
      });
  }

  orderTitle(){
    this.notes = this.notes.sort(this.compareTitle);
    if(!this.titleOrderAsc){
      this.notes.reverse()
    }
    this.titleOrderAsc = !this.titleOrderAsc;
  }

  orderDate(){
    this.notes = this.notes.sort(this.compareDate);
    if(!this.dateOrderAsc){
      this.notes.reverse()
    }
    this.dateOrderAsc = !this.dateOrderAsc;
  }

  compareTitle( a, b ) {
    if ( a.title.toLowerCase() < b.title.toLowerCase() ){
      return -1;
    }
    if ( a.title.toLowerCase() > b.title.toLowerCase() ){
      return 1;
    }
    return 0;
  }

  compareDate( a, b ) {
    if ( a.updatedAt.toLowerCase() < b.updatedAt.toLowerCase() ){
      return -1;
    }
    if ( a.updatedAt.toLowerCase() > b.updatedAt.toLowerCase() ){
      return 1;
    }
    return 0;
  }



}
