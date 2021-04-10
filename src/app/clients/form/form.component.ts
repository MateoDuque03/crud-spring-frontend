import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public title: string = 'Crear nuevo usuario';
  public client: Client = new Client();
  constructor(private clientService: ClientService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadClient();
  }

  create(): void{
    this.clientService.create(this.client).subscribe(
      response => {
        this.router.navigate(['/clients']);
        Swal.fire('Nuevo Cliente', `Cliente ${this.client.nombre} creado con exito!`,'success');
      }
    );
  }

  loadClient(): void {
    this.activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if(id){
        this.clientService.getClient(id).subscribe(client => this.client = client);
      }
    })
  }

  update(): void{
    this.clientService.update(this.client).subscribe( client => {
      this.router.navigate(['/clients']);
      Swal.fire('Cliente Actualizado', `Se actualizó el cliente ${ this.client.nombre }`, 'success');
    });
  }

}
