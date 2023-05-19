import { Component } from '@angular/core';
import { Fornecedor } from '../fornecedor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent {

  fornecedores: Fornecedor[] = [];
  isEditing : boolean = false;
  formGroupFornecedor: FormGroup;

  constructor(private fornecedorService: FornecedorService,
    private formBuilder: FormBuilder, private modalService: NgbModal) {
    this.formGroupFornecedor = formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      supplier: [''],
      price: [''],
      amont: ['']
    })
  }

  ngOnInit(): void {
    this.loadFornecedores();
  }

  loadFornecedores() {
    this.fornecedorService.getFornecedor().subscribe(
      {
        next: data => this.fornecedores = data
      }
    );
  }

  save() {
    if(this.isEditing)
    {
      this.fornecedorService.update(this.formGroupFornecedor.value).subscribe(
        {
          next: () => {
            this.loadFornecedores();
            this.formGroupFornecedor.reset();
            this.isEditing = false;
          }
        }
      )
    }
    else{
      this.fornecedorService.save(this.formGroupFornecedor.value).subscribe(
        {
          next: data => {
            this.fornecedores.push(data);
            this.formGroupFornecedor.reset();
          }
        }
      )
    }
  }

  edit(fornecedor: Fornecedor){
    this.formGroupFornecedor.setValue(fornecedor);
    this.isEditing = true;
  }

  delete(fornecedor: Fornecedor){
    this.fornecedorService.delete(fornecedor).subscribe({
      next: () => this.loadFornecedores()
    })
  }

  open(content: any) {
    this.modalService.open(content);
  }
}
