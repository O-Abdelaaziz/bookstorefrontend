import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
books:Book[];
  constructor(private booksService:BooksService) { }

  ngOnInit(): void {
    this.SelectAllBooks();
  }

  SelectAllBooks(){
    this.booksService.getAllBooks().subscribe(
      (books)=>{
        this.books=books;
      }
    );
  }

}
