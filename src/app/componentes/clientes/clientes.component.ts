import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteServicio: ClienteService) { }

  ngOnInit(): void {
    this.clienteServicio
                .getClientes()
                .subscribe(
                  clientes => {
                    this.clientes = clientes;
                  }
                )
  }


}
