import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailsComponent } from "./recipes/recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShopingListComponent } from "./shoping-list/shoping-list.component";

const appRoutes : Routes = [
    {path : '' , redirectTo : '/recipes' , pathMatch : 'full'},
    {path : 'recipes' , component : RecipesComponent , children : [
        {path : '' , component : RecipeStartComponent},
        {path : 'new' , component : RecipeEditComponent } ,
        {path : ':id' , component : RecipeDetailsComponent } ,
        {path : ':id/edit' , component : RecipeEditComponent } ,

    ]},
    {path : 'shopinglist' , component : ShopingListComponent },
]

@NgModule({
    imports : [
       RouterModule.forRoot(appRoutes), 
    ],
    exports : [
        RouterModule,
    ] 
})

export class AppRoutingModule {

}