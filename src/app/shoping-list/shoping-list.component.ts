import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShopingListService } from './shoping-list.service';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css'] ,
  providers: []
})
export class ShopingListComponent implements OnInit , OnDestroy {
  
  ingredients : Ingredient [] = [] ;

  igChangeSub : Subscription ;

  constructor(private shopingListService : ShopingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shopingListService.getIngredients() ;
    this.igChangeSub = this.shopingListService.shopingListEmitter
      .subscribe(
        (ingredients:Ingredient[])=>{
          this.ingredients = ingredients;
        }
      )
  }

  onEditItem(index : number){
    // console.log(index);
    this.shopingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
    // console.log('Method not implemented');
    // throw new Error('Method not implemented.');
  }

}
