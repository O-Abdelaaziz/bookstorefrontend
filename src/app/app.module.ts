import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BookListComponent } from './components/book-list/book-list.component';
import { SearchComponent } from './components/search/search.component';
import { CategoryComponent } from './components/category/category.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import {JwPaginationModule} from 'jw-angular-pagination';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    SearchComponent,
    CategoryComponent,
    BookDetailsComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    JwPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
