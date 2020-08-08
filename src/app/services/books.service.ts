import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import{map}from 'rxjs/operators';


interface GetEmbeddedBooks {
  _embedded: {
    books: Book[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  baseUrl: string = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) { }

  getAllBooks(categoryId:number): Observable<Book[]> {
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.http.get<GetEmbeddedBooks>(searchUrl).pipe(
      map(response=>response._embedded.books)
    );
  }

  getAllBooksByName(name:string):Observable<Book[]>{
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${name}`;
    return this.http.get<GetEmbeddedBooks>(searchUrl).pipe(
      map(response=>response._embedded.books)
    );
  }


}

