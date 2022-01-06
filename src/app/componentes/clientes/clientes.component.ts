import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteServicio: ClienteService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerClientes();
    /*this.clienteServicio
                .getClientes()
                .subscribe(
                  clientes => {
                    this.clientes = clientes;
                  }
                )*/
  }

  obtenerClientes(){
     this.clienteServicio.obtenerClientes().subscribe(res => {
        console.log(res);
        this.toastr.success('Clientes obtenidos');
     });
  }

}
