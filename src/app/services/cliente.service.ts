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
                public auth: AngularFireAuth) {
      this.itemsCollection = db.collection<Cliente>('clientes');
    }

    getClientes(): Observable<Cliente[]>{
      this.clientes = this.itemsCollection.snapshotChanges().pipe(
        map(cambios => {
            return cambios.map(accion => {
              const datos = accion.payload.doc.data() as Cliente;
              datos.id = accion.payload.doc.id;
              return datos;
            })
          }));

      return this.clientes;
    }

    agregarCliente(cliente: Cliente){
        const clienteCollection = this.db.collection<Cliente>('clientes');
        clienteCollection.add(cliente);
    }

    getCliente(id: string){
      this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
      this.cliente = this.clienteDoc
                            .snapshotChanges()
                            .pipe(map(
                              action => {
                                if(action.payload.exists === false){
                                  return null;
                                }else{
                                  const dato = action.payload.data() as Cliente;
                                  dato.id = action.payload.id;
                                  return dato;
                                }
                              }
                            ))
      return this.cliente;
    }

    modificar(cliente: Cliente){
      this.clienteDoc = this.db.doc<Cliente>(`clientes/${cliente.id}`);
      this.clienteDoc.update(cliente);
    }

    eliminar(cliente: Cliente){
      this.clienteDoc = this.db.doc<Cliente>(`clientes/${cliente.id}`);
      this.clienteDoc.delete();
    }

}