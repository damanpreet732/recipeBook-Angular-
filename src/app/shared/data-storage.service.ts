import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipesService } from "../recipes.service";
import { Recipe } from "../recipes/recipes.model";
import { map, tap } from 'rxjs/operators'


@Injectable({providedIn : 'root' })
export class DataStorageService {
    constructor(private http : HttpClient ,private recipeService : RecipesService) {}

    storeData () {
        let recipe  = this.recipeService.getRecipes() ;
        this.http.put('https://angularfirst-abdfc-default-rtdb.firebaseio.com/recipe.json',recipe)
            .subscribe( response =>  {
                console.log(response);
            } )
    }

    fetchData(){
        return this.http.get<Recipe []>('https://angularfirst-abdfc-default-rtdb.firebaseio.com/recipe.json')
            .pipe( 
                map(recipes => {
                    return recipes.map( recipe => {
                        return {
                            ...recipe , // spread operator
                            ingredients : recipe.ingredients ? recipe.ingredients : [] 
                        }
                    })
                }) ,
                tap (recipes => {
                    this.recipeService.setRecipes(recipes) ; 
                }) 
            )
    }
}