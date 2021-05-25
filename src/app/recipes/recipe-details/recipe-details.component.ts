import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  // @Input() recipe : Recipe ;

  constructor(private recipeService : RecipesService , 
    private activatedRoute : ActivatedRoute ,
    private router : Router, 

  ) { }

  recipe : Recipe ;
  id : number ;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params : Params )=> {
        this.id = +params.id ;
        this.recipe = this.recipeService.getRecipe(this.id) ;
      }
    )
    // console.log(this.id);
  }

  toShopingList(){
    this.recipeService.addIngreditsToShopingList(this.recipe.ingredients);
  }

  onDelete(){
    this.recipeService.delete(this.id);
    this.router.navigate(['/recipes']);
  }

}
