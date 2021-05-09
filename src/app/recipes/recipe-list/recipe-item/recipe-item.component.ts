import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipes.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe : Recipe ; 
  @Output() recipeEmitter = new EventEmitter <Recipe> () ;

  constructor() { }

  ngOnInit(): void {
  }

  onClickRecipe(){
    // console.log('onClickRecipe ----- Clicked')
    this.recipeEmitter.emit();
  }

}
