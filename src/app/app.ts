import { Component, signal } from '@angular/core';
import { ConsultaDeputados } from './consulta-deputados/consulta-deputados';

@Component({
  selector: 'app-root',
  imports: [ConsultaDeputados],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('deputados');
}
