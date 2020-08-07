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

  constructor(
    private booksService: BooksService,
    private categoriesService: CategoriesService,
    private activatedRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.SelectAllBooks();

    this.activatedRout.paramMap.subscribe(
      ()=>{
        this.SelectAllBooks();
      }
    );

    this.SelectAllCategories();
  }

  SelectAllBooks() {
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

  SelectAllCategories(){
    this.categoriesService.getAllCategories().subscribe(
      (categories)=>{
        this.categories=categories;
        console.log(categories);
        
      }
    );
  }
}
