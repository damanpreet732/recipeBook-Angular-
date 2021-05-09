import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit {
  @ViewChild('inputName') inputName : ElementRef;
  @ViewChild('inputAmount') inputAmount : ElementRef ;
  @Output() shopEditEmitter = new EventEmitter<{ingredient : Ingredient,operation : string}>();

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(){
    this.shopEditEmitter.emit({
      ingredient : new Ingredient(this.inputName.nativeElement.value,this.inputAmount.nativeElement.value),
      operation : 'Add',
    })
  }
  onDelete(){
    this.shopEditEmitter.emit({
      ingredient : new Ingredient(this.inputName.nativeElement.value,this.inputAmount.nativeElement.value),
      operation : 'Delete',
    })
  }
  onClear(){
    // console.log(this.inputName)
    this.inputName.nativeElement.value = '' ;
    this.inputAmount.nativeElement.value = '' ;
  }

}
