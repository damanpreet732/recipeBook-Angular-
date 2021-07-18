import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "./user.model";
import { environment } from "src/environments/environment";
export interface AuthResponseData {
    kind : string ;
    idToken : string ;
    email : string ;
    refreshToken : string ;
    expiresIn : string ;
    localId : string ;
    registered? : string ; 
}

@Injectable({ providedIn : 'root' })
export class AuthService {

    user = new BehaviorSubject(null);
    ExpirationTimer : any ;

    constructor(private http : HttpClient ,private router : Router){}

    signUp(email : string , pass : string ){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAuthKey,
            {
                email : email ,
                password : pass ,
                returnSecureToken : true ,
            }
        ).pipe( 
            tap(resData => {
                this.handelAuthToken(
                    resData.email ,
                    resData.localId , 
                    resData.idToken , 
                    +resData.expiresIn
                )
            }) 
        )
    }

    autoLogin() {
        if(localStorage.getItem('user')){
            const localUser = JSON.parse(localStorage.getItem('user'));
            const loadedUser = new User(
                localUser.email , 
                localUser.id , 
                localUser._token , 
                new Date(localUser._tokenExpiryDate) 
            )
            if(!loadedUser.token) return ; 
            this.user.next(loadedUser); 
            this.autoLogout(new Date(loadedUser._tokenExpiryDate).getTime() - new Date().getTime())
        }
    }

    login(email : string , pass : string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAuthKey,
            {
                email : email ,
                password : pass ,
                returnSecureToken : true ,
            }
        )
        .pipe( 
            tap(resData => {
                this.handelAuthToken(
                    resData.email ,
                    resData.localId , 
                    resData.idToken , 
                    +resData.expiresIn
                )
            })
        )
    }

    private handelAuthToken (
        email : string ,
        id : string ,
        token : string ,
        expiresIn : number ,
    ){
        const expiryDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email , id , token , expiryDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000 )
        localStorage.setItem('user' , JSON.stringify(user));
    }


    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('user');
        if(this.ExpirationTimer) {
            clearTimeout(this.ExpirationTimer);
        }
        this.ExpirationTimer = null ;
    }

    autoLogout(ExpirationTime : number ) {
        console.log(ExpirationTime) ;
        this.ExpirationTimer = setTimeout(()=>{
            this.logout();
        },ExpirationTime)
    }

}