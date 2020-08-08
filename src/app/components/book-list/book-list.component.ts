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
  categoryId:number;
  bookName:string;

  constructor(
    private booksService: BooksService,
    private activatedRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectAllBooks();
    this.selectAllBooksByName();
    this.activatedRout.paramMap.subscribe(
      ()=>{
        this.selectAllBooks();
        //this.selectAllBooksByName();
      }
    );    
  }

  selectAllBooks() {
    const hasCategoryId:boolean= this.activatedRout.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.categoryId= +this.activatedRout.snapshot.paramMap.get('id');
    }else{
      this.categoryId=1;
    }
    console.log("category id" + this.categoryId);
    
    this.booksService.getAllBooks(this.categoryId).subscribe(
      (books) => {
        this.books = books;
        console.log("books" + this.books);

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

    console.log("bookName " + this.bookName);

    this.booksService.getAllBooksByName(this.bookName).subscribe(
      (bookListByName)=>{
        this.books=bookListByName;
        console.log("bookListByName "+ bookListByName);
        
      }
    )
  }

}
