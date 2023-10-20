import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './modules/pokemon-list/pokemon-list.component'; // Asegúrate de ajustar la ruta correcta

const routes: Routes = [
  { path: 'pokemons', component: PokemonListComponent },
  // Otras rutas si las tienes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }