import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShopingListService{
    shopingListEmitter = new EventEmitter<Ingredient[]>();

    private ingredients : Ingredient [] = [
        new Ingredient('Apples' , 5),
        new Ingredient('Tommato', 1),
      ] ;

    getIngredients(){
        return this.ingredients.slice();
    }

    add(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.shopingListEmitter.emit(this.ingredients.slice());
    }

    delete(ingredient:Ingredient){
        this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
        this.shopingListEmitter.emit(this.ingredients.slice());
    }

    adds(ingredients:Ingredient[]){
        // for(let ingredint of ingredients) this.add(ingredint)
        this.ingredients.push(...ingredients);
        this.shopingListEmitter.emit(this.ingredients.slice());
    }
        
} 