import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy{

  recipes : Recipe [] = [] ;
  sub : Subscription ;

  constructor(private recipeService : RecipesService,
      private router : Router ,
      private activatedRoute : ActivatedRoute ,
    ) { }


  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.sub = this.recipeService.recipeChanged.subscribe((recipes : Recipe[] ) => {
      this.recipes = recipes ;
    } )
  }

  onNewRecipe(){
    this.router.navigate(['./recipes/new'])
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
    throw new Error('Method not implemented.');
  }

}
