import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShopingListService } from '../shoping-list.service';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit {
  @ViewChild('inputName') inputName : ElementRef;
  @ViewChild('inputAmount') inputAmount : ElementRef ;

  constructor(private shopingListService : ShopingListService) { }

  ngOnInit(): void {
  }

  onAdd(){
    const name = this.inputName.nativeElement.value ;
    const amount = this.inputAmount.nativeElement.value ;
    const ingredient: Ingredient = new Ingredient(name , amount );
    this.shopingListService.add(ingredient);
  }
  onDelete(){
    const name = this.inputName.nativeElement.value ;
    const amount = this.inputAmount.nativeElement.value ;
    const ingredient: Ingredient = new Ingredient(name , amount );
    this.shopingListService.delete(ingredient);
  }
  onClear(){
    // console.log(this.inputName)
    this.inputName.nativeElement.value = '' ;
    this.inputAmount.nativeElement.value = '' ;
  }

}
