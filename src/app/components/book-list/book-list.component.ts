import {Component, OnInit} from '@angular/core';
import {BooksService} from 'src/app/services/books.service';
import {Book} from 'src/app/models/book';
import {ActivatedRoute} from '@angular/router';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
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
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  previousCategory: number = 1;

  constructor(
    private booksService: BooksService,
    private activatedRoute: ActivatedRoute,
    private ngbPaginationConfig:NgbPaginationConfig) {
    ngbPaginationConfig.maxSize=3;
    ngbPaginationConfig.boundaryLinks=true;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      () => {
        this.selectAllBook();
      }
    );
  }

  selectAllBook() {
    this.searchMode = this.activatedRoute.snapshot.paramMap.has('name');
    if (this.searchMode) {
      this.selectAllBooksByName();
    } else {
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

    if(this.previousCategory != this.categoryId){
      this.currentPage=1;
    }

    this.previousCategory=this.categoryId;

    this.booksService.getAllBooks(this.categoryId, this.currentPage - 1, this.pageSize).subscribe(
      (books) => {
        this.books = books._embedded.books;
        this.currentPage = books.page.number + 1;
        this.totalItems = books.page.totalElements;
        this.pageSize = books.page.size;
      }
    );
  }

  selectAllBooksByName() {
    this.bookName = this.activatedRoute.snapshot.paramMap.get('name');

    this.booksService.getAllBooksByName(this.bookName,this.currentPage - 1, this.pageSize).subscribe(
      (bookListByName) => {
        this.books = bookListByName._embedded.books;
        this.currentPage = bookListByName.page.number + 1;
        this.totalItems = bookListByName.page.totalElements;
        this.pageSize = bookListByName.page.size;
      }
    );
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.selectAllBook();
  }

}
