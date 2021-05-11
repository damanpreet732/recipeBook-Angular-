import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShopingListService } from './shoping-list.service';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css'] ,
  providers: []
})
export class ShopingListComponent implements OnInit {
  
  ingredients : Ingredient [] = [] ;

  constructor(private shopingListService : ShopingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shopingListService.getIngredients() ;
    this.shopingListService.shopingListEmitter
      .subscribe(
        (ingredients:Ingredient[])=>{
          this.ingredients = ingredients;
        }
      )
  }

}
