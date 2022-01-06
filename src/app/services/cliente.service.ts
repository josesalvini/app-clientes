import { Injectable } from "@angular/core";

import { AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument} from '@angular/fire/compat/firestore';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Cliente } from "../modelo/cliente.model";
import { AuthService } from "./auth.service";

@Injectable()
export class ClienteService {

    clientesColleccion: AngularFirestoreCollection<Cliente>;
    clienteDoc: AngularFirestoreDocument<Cliente>;
    clientes: Observable<Cliente[]>;
    cliente: Observable<Cliente>;

    private itemsCollection: AngularFirestoreCollection<Cliente>;
    items: Observable<Cliente[]>;

    constructor(private db: AngularFirestore,
                public auth: AngularFireAuth,
                private authService: AuthService) {
      this.itemsCollection = db.collection<Cliente>('clientes');
      this.clientes = this.itemsCollection.snapshotChanges().pipe(
                        map(cambios => {
                            return cambios.map(accion => {
                              const datos = accion.payload.doc.data() as Cliente;
                              datos.id = accion.payload.doc.id;
                              return datos;
                            })
                          }));
      this.clientes.forEach( cliente => {
        console.log("Cliente: " + cliente);
      });
    }

    getClientes(): Observable<Cliente[]>{
      /*this.clientes = this.itemsCollection.snapshotChanges().pipe(
        map(cambios => {
            return cambios.map(accion => {
              const datos = accion.payload.doc.data() as Cliente;
              datos.id = accion.payload.doc.id;
              return datos;
            })
          }));*/

      return this.clientes;
    }

    obtenerClientes(): Observable<any>{
      const uid = this.authService.getUID();
      return this.db.collection('clientes').snapshotChanges();
    }

}