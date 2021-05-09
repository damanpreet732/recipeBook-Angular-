import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']
})
export class ShopingListComponent implements OnInit {
  
  ingredients : Ingredient [] = [
    new Ingredient('Apples' , 5),
    new Ingredient('Tommato', 1),
  ] ;

  constructor() { }

  ngOnInit(): void {
  }

  shoplistChange(event){
    // console.log(event)
    if(event.operation === 'Add') this.ingredients.push(event.ingredient) ;
    else {
      this.ingredients.splice(this.ingredients.indexOf(event.ingredient),1);
    }
  }

}
