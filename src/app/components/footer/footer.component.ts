import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';

import { Message } from '../../models/Message';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLoggedIn: boolean;
  message: Message = {
    name: '',
    email: '',
    message: ''
  }

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
  }

  onSubmit({value,valid}: {value: Message, valid: boolean}){
    console.log(this.message);
    if(valid){
      this.messageService.newMessage(this.message);
    }
  }

}
