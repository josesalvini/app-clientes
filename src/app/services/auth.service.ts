import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import * as firebase from 'firebase/compat/app';

@Injectable()
export class AuthService {

    token: string;
    uid?: string;

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router) {}

    getToken(): string {
        return this.token;
    }

    getUID() {
        return this.uid;
    }

    googleLogin() {
        const provider = new firebase.default.auth.GoogleAuthProvider();
        return this.oAuthLogin(provider).then(value => {
            //console.log('Sucess: ', value);
            console.log('UID: ', value.user?.uid);
            this.uid = value.user?.uid;

            //value.user?.getIdTokenResult().then(result => {
            //    console.log('Token: ', result.token);
            //    this.token = result.token;
            //})
            this.router.navigateByUrl('/home');
          })
           .catch(error => {
             console.log('Something went wrong: ', error);
           });

      }

    logout() {
        this.afAuth.signOut().then(() => {
          this.router.navigate(['/']);
        });
      }

    private oAuthLogin(provider: firebase.default.auth.AuthProvider) {
        return this.afAuth.signInWithPopup(provider);
      }

}