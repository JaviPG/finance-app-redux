import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userSubscription: Subscription

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      if(fuser) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/user`).valueChanges()
        .subscribe( (fsUser: any) => {
          const user = User.fromFirestore(fsUser);
          this.store.dispatch(authActions.setUser({user}));
        });
      } else {
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
      }      
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user === null) return;
        const newUser = new User(user.uid, nombre, email);
        return this.firestore.doc(`${user.uid}/user`).set({...newUser});
      });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((fUser) => fUser !== null));
  }
}
