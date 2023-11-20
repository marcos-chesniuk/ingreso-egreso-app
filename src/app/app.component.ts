import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ingresoEgresoApp';
  firestore: Firestore = inject(Firestore);

  items$: Observable<any[]>;

  constructor(
    private auth: AuthService
  ) {
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);

    this.auth.initAuthListener();
  }
}
