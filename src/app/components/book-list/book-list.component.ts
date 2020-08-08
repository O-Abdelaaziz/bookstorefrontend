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
  categories :Category[];
  categoryId:number;
  bookName:string;

  constructor(
    private booksService: BooksService,
    private categoriesService: CategoriesService,
    private activatedRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectAllBooks();
    this.selectAllBooksByName();
    this.activatedRout.paramMap.subscribe(
      ()=>{
        this.selectAllBooks();
        this.selectAllBooksByName();
      }
    );

    this.selectAllCategories();
    
  }

  selectAllBooks() {
    const hasCategoryId:boolean= this.activatedRout.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.categoryId= +this.activatedRout.snapshot.paramMap.get('id');
    }else{
      this.categoryId=1;
    }
    this.booksService.getAllBooks(this.categoryId).subscribe(
      (books) => {
        this.books = books;
      }
    );
  }

  selectAllCategories(){
    this.categoriesService.getAllCategories().subscribe(
      (categories)=>{
        this.categories=categories;
        // console.log(categories);      
      }
    );
  }

  selectAllBooksByName(){
    const hasBookName=this.activatedRout.snapshot.paramMap.has('name');
    if(hasBookName){
      this.bookName=this.activatedRout.snapshot.paramMap.get('name');
    }else{
      this.bookName='';
    }
    console.log("name "+ this.bookName);
    
    this.booksService.getAllBooksByName(this.bookName).subscribe(
      (bookListByName)=>{
        this.books=bookListByName;
        // console.log(bookListByName);
        
      }
    )
  }

}
