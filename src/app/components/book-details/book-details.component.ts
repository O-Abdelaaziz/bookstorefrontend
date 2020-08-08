import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book=new Book();
  bookId: number;

  constructor(private activatedRoute: ActivatedRoute,
              private bookService: BooksService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      ()=>{
        this.selectBookById();
      }
    )
  }

  selectBookById() {
    // const hasBookId = +this.activatedRoute.snapshot.paramMap.has("id")
    // if (hasBookId) {
    this.bookId = +this.activatedRoute.snapshot.paramMap.get('id');
    // }
    console.log("id "+ this.bookId);

    this.bookService.getBookById(this.bookId).subscribe(
      (book) => {
        this.book = book;
        console.log("book "+ this.book);
      }
    )
  }

}
