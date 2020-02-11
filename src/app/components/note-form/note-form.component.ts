import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {

  noteForm: FormGroup;
  private editingMode: boolean =  false;
  private noteId: number = 0;

  constructor(
    private notesService: NotesService, 
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router){
      
    }

  ngOnInit() {

    this.noteForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'content': new FormControl(null, Validators.required)
    });

    this.noteId = this.route.snapshot.params.id;
    if(this.noteId > 0 ){
      this.loadAndSetNote()
    }
  }


  loadAndSetNote(){
    this.editingMode = true;
    this.notesService.getNote(this.noteId).subscribe( note => {
      this.noteForm.patchValue(note);
    })
  }

  onSubmit(){
    if(!this.editingMode){
      this.notesService.post(this.noteForm.value).subscribe( note => {
        this.messageAndNavigate("Note added");
      }, error => {
        this.messageService.error("Error when trying to create the note");
      });
    }else{
      let values = { ...this.noteForm.value, id: this.noteId};
      this.notesService.put(values).subscribe( note => {
        this.messageAndNavigate("Note updated");
      }, error => {
        this.messageService.error("Error when trying to update the note");
      });
    } 
  }

  messageAndNavigate(message: String){
    this.messageService.success(message);
    this.router.navigate(['/notes']);
    this.noteForm.reset();
  }

  cancel(){
    this.router.navigate(['/notes']);
  }

}
