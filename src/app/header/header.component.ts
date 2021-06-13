import { Component, OnInit, Output ,EventEmitter, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
}) 

export class headerComponent implements OnInit , OnDestroy{

    userSub : Subscription ;
    isAuthenticated : boolean  = false ;

    constructor(
        private dataStorageService : DataStorageService ,
        private authService : AuthService ,    
    ){}


    // @Output() navigate = new EventEmitter<string>();

    ngOnInit(){
        this.userSub = this.authService.user.subscribe(
            (user) => {
                this.isAuthenticated = !!user ;
            }
        )
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

    ngOnDestroy(): void {
        this.userSub.unsubscribe() ;
        // throw new Error("Method not implemented.");
    }

    onLogout(){
        this.authService.logout();
    }

}