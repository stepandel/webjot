import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeImage: String;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.homeImage = 'assets/images/home2.jpeg';
   }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
