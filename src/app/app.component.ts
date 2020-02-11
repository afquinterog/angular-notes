import { Component, OnInit } from '@angular/core';
import { NotesService } from './services/notes.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'app';

  constructor(){ }

  ngOnInit(): void {
  }
}
