import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router,  } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id : number ;
  editMode : Boolean = false ;
  sub : Subscription ;
  recipeEditForm : FormGroup ;

  constructor(private activatedRoute : ActivatedRoute ,
      private recipeServeice : RecipesService ,
      private router : Router , 
    ) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params.id;
        this.editMode = params.id != null;
        this.initForm();
      }
    );
  }
  
  private initForm (){
    let recipeName = '' ;
    let imagePath = '' ;
    let description = '' ;
    let ingredients = new FormArray([]) ;

    if(this.editMode){
      const recipe = this.recipeServeice.getRecipe(this.id);
      recipeName = recipe.name ;
      imagePath = recipe.imagePath ;
      description = recipe.description ;
      if(recipe.ingredients){
        for(let ingredient of recipe.ingredients){
          ingredients.push(
            new FormGroup({
              name : new FormControl(ingredient.name,Validators.required) ,
              amount : new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/[0-9]+[1-9]*$/)]) ,
            })
          )
        }
      }
    }

    // console.log(ingredients)

    this.recipeEditForm = new FormGroup({
      'name' : new FormControl(recipeName,Validators.required),
      'imagePath' : new FormControl(imagePath,Validators.required),
      'description' : new FormControl(description,Validators.required),
      'ingredients' : ingredients ,
    })

    // console.log(this.recipeEditForm);
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeEditForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeEditForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null,Validators.required) ,
        'amount' : new FormControl(null,[Validators.required,Validators.pattern(/[0-9]+[1-9]*$/)]) ,
      })
    )
  }

  onDeleteIngredient(index : number ) {
    (<FormArray>this.recipeEditForm.get('ingredients')).removeAt(index);
  }

  onSubmit(){
    if(this.editMode) this.recipeServeice.updateRecipe(this.id , this.recipeEditForm.value) ;
    else this.recipeServeice.addRecipe(this.recipeEditForm.value) ;
    this.onCancle();
  }

  onCancle() {
    this.router.navigate(['../'],{relativeTo: this.activatedRoute})
  }

  ngOnDestory() {
    this.sub.unsubscribe();
  }

}

