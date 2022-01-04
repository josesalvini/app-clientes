import { Injectable } from "@angular/core";

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Cliente } from "../modelo/cliente.model";

@Injectable()
export class ClienteService {

    clientesColleccion: AngularFirestoreCollection<Cliente>;
    clienteDoc: AngularFirestoreDocument<Cliente>;
    clientes: Observable<Cliente[]>;
    cliente: Observable<Cliente>;

    constructor(private db: AngularFirestore) {
        this.clientesColleccion = db.collection('clientes', ref => ref.orderBy('nombre', 'asc'));
    }

    getClientes(): Observable<Cliente[]>{
      this.clientes = this.clientesColleccion?.snapshotChanges().pipe(
        map(cambios => {
            return cambios.map(accion => {
              const datos = accion.payload.doc.data() as Cliente;
              datos.id = accion.payload.doc.id;
              return datos;
            })
          }));
      return this.clientes;
    }

}