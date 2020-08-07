import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';


const routes: Routes = [
    {path: '', redirectTo:"/books" ,pathMatch:'full'},
    {path: 'books', component: BookListComponent},
    {path: 'books/:id', component: BookListComponent},

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