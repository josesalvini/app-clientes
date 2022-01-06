import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  }

  constructor(private clienteServicio: ClienteService,
              private toastr: ToastrService,
              private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
    this.clienteServicio
                .getClientes()
                .subscribe(
                  clientes => {
                    this.clientes = clientes;
                  });

  }

  getSaldoTotal(): number {
    let saldoTotal: number = 0;
    this.clientes.forEach(cliente => {
        saldoTotal += cliente.saldo;
    });
    return saldoTotal;
  }

  agregar({value, valid}: {value: Cliente, valid: boolean}){
    if(!valid){
      this.flashMessages.show('Completar todos los campos del formulario.',
              {cssClass: 'alert-danger', timeout: 4000})
    }
  }

}
