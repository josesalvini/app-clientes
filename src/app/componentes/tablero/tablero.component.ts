import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  constructor(private router:Router,
    private loginService: AuthService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/']);
      }else{
        this.router.navigate(['/login']);
      }
    });
  }

}
