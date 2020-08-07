import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface GetEmbeddedCategories{
  _embedded: {
    categories: Category[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseUrl:string="http://localhost:8080/api/categories?sort=id,asc";

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<GetEmbeddedCategories>(this.baseUrl).pipe(
      map(response=>response._embedded.categories)
    );
  }
}
