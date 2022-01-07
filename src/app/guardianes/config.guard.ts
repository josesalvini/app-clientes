import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ConfigService } from "../services/config.service";

@Injectable()
export class ConfigGuard implements CanActivate{

    constructor(private router: Router,
                private configSercice: ConfigService){}


    canActivate(): Observable<boolean>{
        return this.configSercice
                    .getConfiguracion()
                    .pipe(map(config => {
                        if(config.permitirRegistro){
                            return true;
                        }else{
                            this.router.navigate(['/login']);
                            return false;
                        }
                    }));
    }




}