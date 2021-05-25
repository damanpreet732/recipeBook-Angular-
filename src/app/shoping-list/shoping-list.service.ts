import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShopingListService{
    // shopingListEmitter = new EventEmitter<Ingredient[]>();
    shopingListEmitter = new Subject <Ingredient[]> () ;
    startedEditing = new Subject <number> ();

    private ingredients : Ingredient [] = [
        new Ingredient('Apples' , 5),
        new Ingredient('Tommato', 1),
      ] ;

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index : number ){
        // console.log(index);
        return this.ingredients[index] ;
    }

    add(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.shopingListEmitter.next(this.ingredients.slice());
    }

    update(ingredient : Ingredient , index : number ){
        this.ingredients[index] = ingredient ;
        this.shopingListEmitter.next( this.ingredients.slice() ) ;
    }

    delete(index : number){
        this.ingredients.splice(index, 1);
        this.shopingListEmitter.next(this.ingredients.slice());
    }

    adds(ingredients:Ingredient[]){
        // for(let ingredint of ingredients) this.add(ingredint)
        this.ingredients.push(...ingredients);
        this.shopingListEmitter.next(this.ingredients.slice());
    }
        
} 