import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeImage: String;

  constructor() {
    this.homeImage = 'assets/images/home2.jpeg';
   }

  ngOnInit() {
  }

}
