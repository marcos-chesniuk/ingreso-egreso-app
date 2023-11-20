import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.model';
import { Firestore, addDoc, collection, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: Auth,
    private firestore: Firestore
  ) { }

  initAuthListener() {
    authState(this.auth).subscribe( fuser => {
      console.log(fuser);
      console.log(fuser?.uid);
      console.log(fuser?.email);
      
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
