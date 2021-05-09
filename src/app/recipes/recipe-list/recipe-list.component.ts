import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeEmitter = new EventEmitter <Recipe> () ;

  recipes : Recipe [] = [
    new Recipe ('Test Recipe','Just a Test for recipy','https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-scotch-quails-eggs-5177019.jpg?quality=90&resize=960,872'),
    new Recipe ('Test Recipe 2' , 'Jsut a Test Again' ,'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-scotch-quails-eggs-5177019.jpg?quality=90&resize=960,872')
  ]

  constructor() { }

  ngOnInit(): void {
    
  }

  emitRecipe(recipe : Recipe ){
    // console.log("emitRecipe ---- Called")
    this.recipeEmitter.emit(recipe)
  }

}
