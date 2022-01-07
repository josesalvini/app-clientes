import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  permitirRegistro: boolean;

  constructor(private loginService: AuthService,
              private router: Router,
              private configService: ConfigService) { }

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
        });

    this.configService
            .getConfiguracion()
            .subscribe(config => {
                this.permitirRegistro = config.permitirRegistro;
            });
  }

  logout(){
    this.loginService.logout();
    this.isLoggedIn = false;
    this.loggedInUser = 'Usuario';
    this.router.navigate(['/login']);
  }

}
