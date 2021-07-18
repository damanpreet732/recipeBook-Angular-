import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  wantsLogin = true ;
  error = null ;

  @ViewChild(PlaceholderDirective , {static:false}) alertHost : PlaceholderDirective;

  constructor( 
    private authService : AuthService , 
    private router : Router ,
    private ComponentFactoryResolver : ComponentFactoryResolver 
  ) { }

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
          this.showErrorAlert();
          // this.error = "An Error Occured !" ;
          console.log(err);
        }
      )

      authForm.reset();
    }
  }

  // onHandleError() {
  //   this.error = null ;
  // }

  private showErrorAlert() {
    // const alertCmp = new AlertComponent() ;
    const alertCmpFactory = this.ComponentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hsotViewContainerRef = this.alertHost.ViewContainerRef ;
    hsotViewContainerRef.clear();

    const componentRef = hsotViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = this.error;
    const sub : Subscription = componentRef.instance.close.subscribe(() => {
      sub.unsubscribe();
      hsotViewContainerRef.clear();
    })
  }

}
