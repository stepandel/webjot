import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../../services/idea.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Idea } from '../../models/Idea';

@Component({
  selector: 'app-view-idea',
  templateUrl: './view-idea.component.html',
  styleUrls: ['./view-idea.component.css']
})
export class ViewIdeaComponent implements OnInit {
  id: string;
  idea: Idea;
  loggedInUser: string;

  constructor(
    private ideaService: IdeaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // get id from url
    this.id = this.route.snapshot.params['id'];
    // get idea from FireBase
    this.authService.getAuth().subscribe(auth => {
      this.loggedInUser = auth.uid;
      this.ideaService.getIdea(this.loggedInUser, this.id).subscribe(idea => {
        this.idea = idea;
      });
    });
  }

  onRemoveClick() {
    if(confirm('Are you sure?')){
      this.ideaService.deleteIdea(this.loggedInUser, this.idea);
      this.flashMessage.show('Idea has been deleted', {
        cssClass: 'alert-danger', timeout: 4000
      });
      this.router.navigate(['/dashboard']);
    }
  }

  updateStatus(status: string) {
    this.idea.status = status;
    this.ideaService.updateIdea(this.loggedInUser, this.idea);
  }

}
