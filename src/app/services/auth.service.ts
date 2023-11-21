import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.model';
import { Firestore, Unsubscribe, addDoc, collection, doc, getDocs, onSnapshot, query, where } from '@angular/fire/firestore';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { setUser, unsetUser } from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userUnsubscribe: Unsubscribe;

  constructor(
    public auth: Auth,
    private firestore: Firestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    authState(this.auth).subscribe( fuser => {
      if ( fuser ) {
        const userRef = collection(this.firestore, 'user');
        const q = query(userRef, where("uid","==",fuser.uid));
        getDocs(q).then(querySnapshot => {
          querySnapshot.forEach((doc: any) => {
            let data: any = doc.data();
            let user = Usuario.fromFirebase(data);
            this.store.dispatch(setUser({user}))
          })
        });
      } else {
        this.store.dispatch(unsetUser());
      }
    })
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then( ({ user }) => {
      const newUser = new Usuario(user.uid, nombre, email);
      const userRef = collection(this.firestore, 'user');

      return addDoc(userRef, {...newUser})
    })
  }

  loginUsuario(email:string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  isAuth() {
    return authState(this.auth).pipe(
      map(fuser => fuser != null)
    )
  }
}
