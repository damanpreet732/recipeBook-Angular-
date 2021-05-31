import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { RecipesService } from "./recipes.service";
import { Recipe } from "./recipes/recipes.model";
import { DataStorageService } from "./shared/data-storage.service";


@Injectable ({ providedIn : 'root' }) 
export class RecipeResolverService implements Resolve <Recipe []> {

    constructor (private dataStorageService : DataStorageService ,
        private recipeService : RecipesService ,
    ){}

    resolve(route : ActivatedRouteSnapshot , state : RouterStateSnapshot){
        const recipes = this.recipeService.getRecipes() ;

        if(recipes.length == 0) return this.dataStorageService.fetchData();
        else return recipes ;
    }
} 