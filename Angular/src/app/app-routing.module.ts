import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './modules/pokemon-list/pokemon-list.component'; // Asegúrate de ajustar la ruta correcta
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'pokemons', component: PokemonListComponent },
  { path: '', component: HomeComponent }, // Esta es la ruta de inicio

  // Otras rutas si las tienes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }