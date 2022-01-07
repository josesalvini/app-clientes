import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  }
  id: string;

  constructor(private clienteServicio: ClienteService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clienteServicio
        .getCliente(this.id)
        .subscribe((cliente: Cliente) => {
            this.cliente = cliente;
        });
  }

  guardar({value, valid}: {value: Cliente, valid: boolean}){
    if(!valid){
      this.flashMessages.show('Completar todos los campos del formulario.',
      {cssClass: 'alert-danger', timeout: 4000})
    }else{
      value.id = this.id;
      this.clienteServicio.modificar(value);
      this.router.navigate(['/']);
    }
  }

  eliminar(){
    if(confirm('¿Seguro que quiere eliminar el cliente?')){
      this.clienteServicio.eliminar(this.cliente);
      this.router.navigate(['/']);
    }
  }

}
