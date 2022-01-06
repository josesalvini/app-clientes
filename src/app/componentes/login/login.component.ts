import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private router:Router,
              private flashMessages: FlashMessagesService,
              private loginService: AuthService) {}

  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/']);
      }
    });
  }

  login(){
    this.loginService.googleLogin();
  }

}
