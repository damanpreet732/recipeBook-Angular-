import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params,  } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id : number ;
  editMode : Boolean = false ;
  sub : Subscription ;

  constructor(private activatedRoute : ActivatedRoute ) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params.id;
        this.editMode = params.id != null;
      }
    );
  }
  
  ngOnDestory() {
    this.sub.unsubscribe();
  }

}

