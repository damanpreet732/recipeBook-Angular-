import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  wantsLogin = true ;
  error = null ;

  constructor( private authService : AuthService ) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.wantsLogin = !this.wantsLogin ;
  }

  onSubmit(authForm : FormGroup){
    if(authForm.value){
      const email = authForm.value.email ;
      const pass = authForm.value.password ;
      if(this.wantsLogin){
        // pass 
      }
      else {
        this.authService.onSignUp(email , pass).subscribe(
          resData => {
            console.log(resData);
          },
          err => {
            this.error = err.error.error.message ;
            // this.error = "An Error Occured !" ;
            console.log(err);
          }
        )
      }
      authForm.reset();
    }
  }

}
