import { Component, OnInit, Output ,EventEmitter } from "@angular/core";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
}) 

export class headerComponent implements OnInit{

    @Output() navigate = new EventEmitter<string>();

    ngOnInit(){
    }

    onNavigate(event){
        // event.target.parentNode.classList.add('active')
        this.navigate.emit(event.target.innerText);
    }

}