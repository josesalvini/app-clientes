import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;

  constructor(private loginService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
      this.loginService.getAuth().subscribe(
        auth => {
          if(auth){
            this.isLoggedIn = true;
            this.loggedInUser = auth.displayName;
          }else{
            this.isLoggedIn = false;
            this.loggedInUser = 'Usuario';
          }
        }
      )
  }

  logout(){
    this.loginService.logout();
    this.isLoggedIn = false;
    this.loggedInUser = 'Usuario';
    this.router.navigate(['/login']);
  }

}
