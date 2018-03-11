import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IdeaService } from '../../services/idea.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Idea } from '../../models/Idea';

@Component({
  selector: 'app-edit-idea',
  templateUrl: './edit-idea.component.html',
  styleUrls: ['./edit-idea.component.css']
})
export class EditIdeaComponent implements OnInit {
  id: string;
  idea: Idea;
  loggedInUser: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ideaService: IdeaService,
    private authService: AuthService,
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

  onSubmit({value, valid}: {value: Idea, valid: boolean}) {
    if(!valid){
      alert('Please fill all all the fields!');
    } else {
      this.ideaService.updateIdea(this.loggedInUser, this.idea);
      this.flashMessage.show('Idea has been updated', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/idea/view/'+this.id]);
    }
  }

}
