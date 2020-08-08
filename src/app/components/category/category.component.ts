import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories :Category[];

  constructor(private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.selectAllCategories();
  }

  selectAllCategories(){
    this.categoriesService.getAllCategories().subscribe(
      (categories)=>{
        this.categories=categories;
        // console.log(categories);
      }
    );
  }

}
