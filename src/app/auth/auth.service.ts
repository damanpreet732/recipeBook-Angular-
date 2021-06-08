import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "./user.model";

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

    user = new Subject();

    constructor(private http : HttpClient ,){}

    signUp(email : string , pass : string ){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCeztZIrxRyBv4aqVoOMx8z3lKjmaDOeY4',
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

    // login(email : string , pass : string){
    //     return this.http.post<AuthResponseData>(
    //         '',
    //         {
    //             email : email ,
    //             password : pass ,
    //             returnSecureToken : true ,
    //         }
    //     )
    //     .pipe( 
    //         tap(resData => {
    //             this.handelAuthToken(
    //                 resData.email ,
    //                 resData.localId , 
    //                 resData.idToken , 
    //                 +resData.expiresIn
    //             )
    //         })
    //     )
    // }

    private handelAuthToken (
        email : string ,
        id : string ,
        token : string ,
        expiresIn : number ,
    ){
        const expiryDate = new Date(new Date().getTime() + 1000*expiresIn);
        const user = new User(email , id , token , expiryDate);
        this.user.next(user);
    }

}