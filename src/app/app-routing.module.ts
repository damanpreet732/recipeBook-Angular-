import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { RecipeResolverService } from "./recipe-resolver.service";
import { RecipeDetailsComponent } from "./recipes/recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShopingListComponent } from "./shoping-list/shoping-list.component";

const appRoutes : Routes = [
    {path : '' , redirectTo : '/recipes' , pathMatch : 'full'},
    {path : 'recipes' , component : RecipesComponent , canActivate : [ AuthGuard ] , 
        children : [
            {path : '' , component : RecipeStartComponent},
            {path : 'new' , component : RecipeEditComponent } ,
            {path : ':id' , component : RecipeDetailsComponent , resolve : [RecipeResolverService]} ,
            {path : ':id/edit' , component : RecipeEditComponent , resolve : [RecipeResolverService]} ,
        ]
    },
    {path : 'auth' , component : AuthComponent },
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