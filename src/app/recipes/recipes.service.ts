import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipes.model'

export class RecipesService {
    recipeSelected = new EventEmitter<Recipe> (); 

    private recipes : Recipe [] = [
        new Recipe (
            'Test Recipe',
            'Just a Test for recipy',
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-scotch-quails-eggs-5177019.jpg?quality=90&resize=960,872',
            [new Ingredient('t1f1' , 1),new Ingredient('t1f2' , 2),new Ingredient('t1f3' , 3)],
        ),
        new Recipe (
            'Test Recipe 2' ,
            'Jsut a Test Again' ,
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-scotch-quails-eggs-5177019.jpg?quality=90&resize=960,872',
            [new Ingredient('t2f1' , 1),new Ingredient('t2f2' , 2),new Ingredient('t2f3' , 3)],
        )
      ]
    
    getRecipes (){
        return this.recipes.slice();
    }
}