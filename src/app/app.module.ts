import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BookListComponent } from './components/book-list/book-list.component';
import { SearchComponent } from './components/search/search.component';
import { CategoryComponent } from './components/category/category.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
// import {JwPaginationModule} from 'jw-angular-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartDetailsComponent } from './components/cart-details/cart-details.component'; 

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    SearchComponent,
    CategoryComponent,
    BookDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // JwPaginationModule,
    NgbModule,
    NgxSpinnerModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
