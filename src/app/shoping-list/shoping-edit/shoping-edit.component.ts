import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShopingListService } from '../shoping-list.service';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit , OnDestroy{
  // @ViewChild('inputName') inputName : ElementRef;
  // @ViewChild('inputAmount') inputAmount : ElementRef ;
  @ViewChild('f') slForm : NgForm ;

  subscription : Subscription ;
  editMode : boolean = false ;
  editedItemIndex : number ;
  editedItem : Ingredient ;

  constructor(private shopingListService : ShopingListService) { }


  ngOnInit(): void {
    this.subscription = this.shopingListService.startedEditing
      .subscribe(
        (index : number) => {
          this.editMode = true ;
          this.editedItemIndex = index ;
          this.editedItem = this.shopingListService.getIngredient(index);
          // console.log(this.slForm);
          this.slForm.setValue({
            name : this.editedItem.name ,
            amount : this.editedItem.amount ,
          })
        }
      )
  }

  onSubmit(form : NgForm){
    // const name = this.inputName.nativeElement.value ;
    // const amount = this.inputAmount.nativeElement.value ;
    const ingredient: Ingredient = new Ingredient(form.value.name , form.value.amount );
    if(this.editMode){
      this.shopingListService.update(ingredient,this.editedItemIndex);
    }
    else this.shopingListService.add(ingredient);
    this.slForm.reset();
    this.editMode = false ;
  }
  onDelete(){
    this.onClear();
    this.shopingListService.delete(this.editedItemIndex);
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false ;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log('Method not implemented')
    // throw new Error('Method not implemented.');
  }

}
