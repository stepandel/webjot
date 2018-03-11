import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../../services/idea.service';
import { AuthService } from '../../services/auth.service';

import { Idea } from '../../models/Idea';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ideas: Idea[];
  loggedInUser: string;

  constructor(
    private ideaService: IdeaService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      this.loggedInUser = auth.uid;
      this.ideaService.getIdeas(this.loggedInUser).subscribe(auth => {
        this.ideas = auth;
      });
    });
  }

}
