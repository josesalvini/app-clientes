import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { FlashMessagesService } from 'flash-messages-angular';
import { NgForm } from '@angular/forms';

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

  @ViewChild('clienteForm') clienteForm: NgForm;
  @ViewChild('botonCerrar') botonCerrar: ElementRef;

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
    if(this.clientes){
        this.clientes.forEach(cliente => {
          saldoTotal += cliente.saldo;
      });
    }

    return saldoTotal;
  }

  agregar({value, valid}: {value: Cliente, valid: boolean}){
    if(!valid){
      this.flashMessages.show('Completar todos los campos del formulario.',
              {cssClass: 'alert-danger', timeout: 4000})
    }else{
      this.clienteServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
      this.toastr.success('Cliente agregado.','Agregar cliente');
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}
