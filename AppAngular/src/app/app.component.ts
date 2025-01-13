import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Routes } from '@angular/router';
import { PessoasComponent } from './components/pessoas/pessoas.component';

const routes: Routes = [
  { path: 'pessoas', component: PessoasComponent }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],  // Apenas o RouterModule aqui
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AppAngular';
}

