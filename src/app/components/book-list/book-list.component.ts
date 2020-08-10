import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/models/book';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../services/cart.service';
import { Cartitem } from '../../models/cartitem';
import { NgxSpinnerService } from 'ngx-spinner';
//import * as $ from 'jquery';
import 'bootstrap-notify';


declare var $;

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
    private spinnerService: NgxSpinnerService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private ngbPaginationConfig: NgbPaginationConfig) {
    ngbPaginationConfig.maxSize = 3;
    ngbPaginationConfig.boundaryLinks = true;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      () => {
        this.selectAllBook();
      }
    );
  }

  selectAllBook() {
    this.spinnerService.show();
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

    if (this.previousCategory != this.categoryId) {
      this.currentPage = 1;
    }

    this.previousCategory = this.categoryId;

    this.booksService.getAllBooks(this.categoryId, this.currentPage - 1, this.pageSize).subscribe(
      this.loadBookWithSppiner()
    );
  }

  selectAllBooksByName() {
    this.bookName = this.activatedRoute.snapshot.paramMap.get('name');

    this.booksService.getAllBooksByName(this.bookName, this.currentPage - 1, this.pageSize).subscribe(
      this.loadBookWithSppiner()
    );
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.selectAllBook();
  }

  addToCart(book: Book) {
    const cartItem = new Cartitem(book);
    this.cartService.addToCart(cartItem);
    //this.showNotification(book);
  }

  loadBookWithSppiner() {
    return (books) => {
      this.spinnerService.hide();
      this.books = books._embedded.books;
      this.currentPage = books.page.number + 1;
      this.totalItems = books.page.totalElements;
      this.pageSize = books.page.size;
    }
  }

  showNotification(book :Book) {
    $.notify({
      // options
      icon: 'glyphicon glyphicon-warning-sign',
      title: 'Item Add To Cart',
      message: `The ${book.name} is add to cart successfully.`,
    }, {
      // settings
      element: 'body',
      type: 'info',
      allow_dismiss: true,
      url_target:'_blank'
    });
  }

}
