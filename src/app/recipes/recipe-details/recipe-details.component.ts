import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  // @Input() recipe : Recipe ;

  constructor(private recipeService : RecipesService , 
    private activatedRoute : ActivatedRoute ,
  ) { }

  recipe : Recipe ;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params : Params )=> {
        this.recipe = this.recipeService.getRecipe(+params.id) ;
      }
    )
    // console.log(this.id);
  }

  toShopingList(){
    this.recipeService.addIngreditsToShopingList(this.recipe.ingredients);
  }

}
