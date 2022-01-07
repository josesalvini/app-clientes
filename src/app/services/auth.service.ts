import { Injectable, ResolvedReflectiveFactory } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import * as firebase from 'firebase/compat/app';
import { map } from "rxjs/operators";

@Injectable()
export class AuthService {

    token: string;
    uid: string;

    constructor(
        private authService: AngularFireAuth,
        private router: Router) {}

    login(email: string, password: string){
        return this.authService.signInWithEmailAndPassword(email, password);
    }

    getAuth(){
      return this.authService.authState.pipe(
        map(auth => auth)
      );

    }

    googleLogin() {
        const provider = new firebase.default.auth.GoogleAuthProvider();
        return this.oAuthLogin(provider).then(value => {
            this.router.navigateByUrl('/');
          })
           .catch(error => {
             console.log('Something went wrong: ', error);
           });

      }

    logout() {
        this.authService.signOut();
    }

    private oAuthLogin(provider: firebase.default.auth.AuthProvider) {
        return this.authService.signInWithPopup(provider);
      }

}