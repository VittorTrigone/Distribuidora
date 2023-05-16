import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  clientes: Cliente[] = [];
  isEditing : boolean = false;
  formGroupCliente: FormGroup;

  constructor(private clienteService: ClienteService,
    private formBuilder: FormBuilder) {
    this.formGroupCliente = formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      supplier: [''],
      price: [''],
      amont: ['']
    })
  }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes() {
    this.clienteService.getCliente().subscribe(
      {
        next: data => this.clientes = data
      }
    );
  }

  save() {
    if(this.isEditing)
    {
      this.clienteService.update(this.formGroupCliente.value).subscribe(
        {
          next: () => {
            this.loadClientes();
            this.formGroupCliente.reset();
            this.isEditing = false;
          }
        }
      )
    }
    else{
      this.clienteService.save(this.formGroupCliente.value).subscribe(
        {
          next: data => {
            this.clientes.push(data);
            this.formGroupCliente.reset();
          }
        }
      )
    }
  }

  edit(cliente: Cliente){
    this.formGroupCliente.setValue(cliente);
    this.isEditing = true;
  }

  delete(cliente: Cliente){
    this.clienteService.delete(cliente).subscribe({
      next: () => this.loadClientes()
    })
  }
}
