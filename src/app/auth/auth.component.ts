import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  wantsLogin = true ;
  error = null ;

  constructor( private authService : AuthService , private router : Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.wantsLogin = !this.wantsLogin ;
  }

  onSubmit(authForm : FormGroup){
    let authObs : Observable <AuthResponseData> ;

    if(authForm.value){
      const email = authForm.value.email ;
      const pass = authForm.value.password ;
      if(this.wantsLogin){
        authObs = this.authService.login(email , pass)
      }
      else {
        authObs = this.authService.signUp(email , pass)
      }

      authObs.subscribe(
        resData => {
          console.log(resData);
          this.router.navigate(['/recipes']);
        },
        err => {
          this.error = err.error.error.message ;
          // this.error = "An Error Occured !" ;
          console.log(err);
        }
      )

      authForm.reset();
    }
  }

}
