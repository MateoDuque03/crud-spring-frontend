import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clientes: Client[];
  constructor(private clienteService: ClientService) {}

  ngOnInit(): void {
    this.clienteService
      .getClients()
      .subscribe((clients) => (this.clientes = clients));
  }

  deleteClient(client: Client): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Estas seguro?',
        text: `Esta seguro de eliminar el cliente ${client.nombre} ${client.apellido}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar!',
        cancelButtonText: 'Cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.clienteService.delete(client.id).subscribe((response) => {
            this.clientes = this.clientes.filter((cli) => cli !== client);
            Swal.fire(
              'Eliminado!',
              `El cliente ${client.nombre} ha sido eliminado con exito!`,
              'success'
            );
          });
        }
      });
  }
}
