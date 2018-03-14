import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;
  repassword: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.password !== this.repassword){
      this.flashMessage.show("Passwords do not match!", {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      this.authService.signup(this.email, this.password).then(res => {
        this.flashMessage.show('You are registered and logged in!', {
          cssClass: 'alert-success', timeout: 4000
        });
        this.router.navigate(['/dashboard']);
      })
      .catch(err => {
        this.flashMessage.show("Form is filled up incorrectly!", {
          cssClass: 'alert-danger', timeout:4000
        });
      });
    }
  }

}
