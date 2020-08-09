import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import{map}from 'rxjs/operators';


interface GetEmbeddedBooks {
  _embedded: {
    books: Book[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  baseUrl: string = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) { }

  getAllBooks(categoryId:number,currentPage:number,pageSize:number): Observable<GetEmbeddedBooks> {
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${currentPage}&size=${pageSize}`;
    return this.http.get<GetEmbeddedBooks>(searchUrl);
  }

  getAllBooksByName(name:string,currentPage:number,pageSize:number):Observable<GetEmbeddedBooks>{
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${name}&page=${currentPage}&size=${pageSize}`;
    return this.http.get<GetEmbeddedBooks>(searchUrl);
  }

  getBookById(id:number):Observable<Book>{
    const searchUrl=`${this.baseUrl}/${id}`;
    return this.http.get<Book>(searchUrl);
  }


}

