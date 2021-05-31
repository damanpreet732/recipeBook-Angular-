import { Component, OnInit, Output ,EventEmitter } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
}) 

export class headerComponent implements OnInit{

    constructor(private dataStorageService : DataStorageService ){}

    // @Output() navigate = new EventEmitter<string>();

    ngOnInit(){
    }

    // onNavigate(event){
    //     // event.target.parentNode.classList.add('active')
    //     this.navigate.emit(event.target.innerText);
    // }

    onSaveData(){
        this.dataStorageService.storeData();
    }

    onFetchData(){
        this.dataStorageService.fetchData().subscribe();
    }

}