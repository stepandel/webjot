import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IdeaService } from '../../services/idea.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Idea } from '../../models/Idea';

@Component({
  selector: 'app-add-idea',
  templateUrl: './add-idea.component.html',
  styleUrls: ['./add-idea.component.css']
})
export class AddIdeaComponent implements OnInit {
  idea: Idea = {
    name: '',
    description: '',
    date: new Date(),
    status: 'Idea'
  }

  constructor(
    private router: Router,
    private ideaService: IdeaService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.idea.user = auth.uid;
      }
    })
  }

  onSubmit({value, valid}: {value: Idea, valid: boolean}){
    if(!valid){
      // Show error
      this.flashMessage.show('Form is filled incorrectly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Show success message
      this.flashMessage.show('New idea has been added!', {
        cssClass: 'alert-success', timeout: 4000
      });
      console.log(this.idea);
      // Add idea to DB
      this.ideaService.newIdea(this.idea.user, this.idea);
      // Redirect to Dashboard
      this.router.navigate(['/dashboard']);
    }
  }

}
