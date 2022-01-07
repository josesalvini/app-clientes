import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracion } from 'src/app/modelo/configuracion.model';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  permitirRegistro:boolean = false;

  constructor(private router: Router,
              private configService: ConfigService) { }

  ngOnInit(): void {
    this.configService
            .getConfiguracion()
            .subscribe(
              (configuracion: Configuracion) => {
                this.permitirRegistro = configuracion.permitirRegistro;
              }
            );
  }

  guardar(){
    let config = {permitirRegistro: this.permitirRegistro};
    this.configService.modificarConfiguracion(config);
    this.router.navigate(['/']);
  }

}
