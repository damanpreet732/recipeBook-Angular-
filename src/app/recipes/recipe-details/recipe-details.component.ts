import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  @Input() recipe : Recipe ;

  constructor(private recipeService : RecipesService) { }

  ngOnInit(): void {
  }

  toShopingList(){
    this.recipeService.addIngreditsToShopingList(this.recipe.ingredients);
  }

}
