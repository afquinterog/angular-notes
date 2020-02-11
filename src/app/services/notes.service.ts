
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class NotesService{

    notes : Note[] = [];
    apiUrl: string = 'http://127.0.0.1:5000/api/notes/';
    
    constructor(private http: HttpClient){

    }

    get(){
        return this.http.get(this.apiUrl)
        .pipe( map( data => {
            this.notes = data.notes;
            return this.notes;
        }));
    }

    getNote(id: number){
        return this.http.get(this.apiUrl + id)
        .pipe( map( data => {
           return data;
        }));
    }

    post(note: Note){
        return this.http.post(this.apiUrl, note)
        .pipe( map( data => {
            console.log(data);
        }));
    }

    put(note: Note){
        return this.http.put(this.apiUrl + note.id, note)
        .pipe( map( data => {
            console.log(data);
        }));
    }

    delete(note: Note){
        return this.http.delete(this.apiUrl + note.id, {})
        .pipe( map( data => {
            console.log(data);
        }));
    }
    
}