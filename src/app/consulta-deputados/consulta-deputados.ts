import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Deputado } from '../deputado';
import { DeputadoService } from '../deputado-service';

@Component({
  selector: 'app-consulta-deputados',
  imports: [ReactiveFormsModule],
  templateUrl: './consulta-deputados.html',
  styleUrl: './consulta-deputados.scss',
})
export class ConsultaDeputados {
  deputados = signal<Deputado[]>([]);

  // Validação com ReactiveForms: obrigatório, mínimo 2 caracteres, apenas letras
  partido = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(15),
    Validators.pattern(/^[A-Za-zÀ-ÿ]+$/),
  ]);

  constructor(private deputadoService: DeputadoService) {}

  buscar() {
    if (this.partido.invalid) {
      this.partido.markAsTouched();
      return;
    }

    this.deputadoService.buscarPorPartido(this.partido.value!).subscribe({
      next: (dados) => this.deputados.set(dados),
      error: () => this.deputados.set([]),
    });
  }
}