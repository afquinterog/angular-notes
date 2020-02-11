import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteItemComponent } from './components/note-item/note-item.component';
import { NotesService } from './services/notes.service';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageService } from './services/message.service';


const appRoutes: Routes = [
  { path: '', component: NoteListComponent },
  { path: 'notes', component: NoteListComponent },
  { path: 'notes/new', component: NoteFormComponent },
  { path: 'note/:id', component: NoteFormComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteFormComponent,
    NoteItemComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    NotesService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
