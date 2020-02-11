import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../../models/note.model';
import { NotesService } from '../../services/notes.service';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent implements OnInit {

  @Input()
  note: Note;

  constructor(private notesService: NotesService, 
              private messageService: MessageService,
              private router: Router){ 

  }

  ngOnInit() {

  }

  edit(){
    this.router.navigate(['/note', this.note.id]);
  }

  delete(){
    this.notesService.delete(this.note).subscribe( response => {
      this.messageService.success("Note deleted")
    }, error =>{
      this.messageService.error("Error when trying to delete the note")
    }
  }

}
