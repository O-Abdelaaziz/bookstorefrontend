import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];
  categoryId: number;
  bookName: string;

  constructor(
    private booksService: BooksService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectAllBooks();
    this.selectAllBooksByName();
    this.activatedRoute.paramMap.subscribe(
      () => {
        this.selectAllBooks();
        this.selectAllBooksByName();
      }
    );
  }

  selectAllBooks() {
    const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.categoryId = +this.activatedRoute.snapshot.paramMap.get('id');
    } else {
      this.categoryId = 1;
    }
    console.log("category id" + this.categoryId);

    this.booksService.getAllBooks(this.categoryId).subscribe(
      (books) => {
        this.books = books;
        console.log("books" + books);

      }
    );
  }



  selectAllBooksByName() {
    // const hasBookName=this.activatedRoute.snapshot.paramMap.has('name');
    // if(hasBookName){
    this.bookName = this.activatedRoute.snapshot.paramMap.get('name');
    // }else{
    //   this.bookName='';
    // }    

    console.log("bookName " + this.bookName);
    this.booksService.getAllBooksByName(this.bookName).subscribe(
      (bookListByName) => {
        this.books = bookListByName;
        console.log("bookListByName " + bookListByName);

      }
    )
  }

}
