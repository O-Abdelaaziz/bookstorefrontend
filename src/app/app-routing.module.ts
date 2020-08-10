import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

const routes: Routes = [
    {path: '', redirectTo:"/books" ,pathMatch:'full'},
    {path: 'books', component: BookListComponent},
    {path: 'search/:name', component: BookListComponent},
    {path: 'category/:id', component: BookListComponent},
    {path: 'books/:id', component: BookDetailsComponent},
    {path: 'cartdetails', component: CartDetailsComponent},

    {path: '**', redirectTo: '/notfound', pathMatch: 'full'}

  ];


  @NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule {

  }
