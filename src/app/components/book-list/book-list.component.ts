import {Component, OnInit} from '@angular/core';
import {BooksService} from 'src/app/services/books.service';
import {Book} from 'src/app/models/book';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];
  categoryId: number;
  bookName: string;
  searchMode: boolean;
  pageOfItems: Array<Book>;
  pageSize: number = 6;


  constructor(
    private booksService: BooksService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      () => {
        this.selectAllBook();
      }
    );
  }

  selectAllBook(){
    this.searchMode = this.activatedRoute.snapshot.paramMap.has('name');
    if(this.searchMode){
      this.selectAllBooksByName();
    }else{
      this.selectAllBooksByCategoryId();
    }
  }


  selectAllBooksByCategoryId() {
    const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.categoryId = +this.activatedRoute.snapshot.paramMap.get('id');
    } else {
      this.categoryId = 1;
    }

    this.booksService.getAllBooks(this.categoryId).subscribe(
      (books) => {
        this.books = books;
      }
    );
  }

  selectAllBooksByName() {
    this.bookName = this.activatedRoute.snapshot.paramMap.get('name');

    this.booksService.getAllBooksByName(this.bookName).subscribe(
      (bookListByName) => {
        this.books = bookListByName;
      }
    );
  }


  onChangePage(pageOfItems: Array<Book>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  updatePageSize(pageSize:number){
    this.pageSize=pageSize;
    this.selectAllBook();
  }

}
