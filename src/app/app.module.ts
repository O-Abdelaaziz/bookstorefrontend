import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import{HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './components/search/search.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { CategoryComponent } from './components/category/category.component';
import {JwPaginationComponent} from 'jw-angular-pagination';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    SearchComponent,
    BookDetailsComponent,
    CategoryComponent,
    JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
