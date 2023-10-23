import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import { FavoritePokemonDialogComponent } from '../favorite-pokemon-dialog/favorite-pokemon-dialog.component';

@Component({
  selector: 'app-favorite-pokemon',
  templateUrl: './favorite-pokemon.component.html',
  styleUrls: ['./favorite-pokemon.component.css']
})
export class FavoritePokemonComponent {
  @Input() favoritePokemons: any[] = [];
  @Output() removeFavorite = new EventEmitter<any>(); // Evento para eliminar de favoritos

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  removeFromFavorites(pokemon: any) {
    const index = this.favoritePokemons.indexOf(pokemon);
    if (index !== -1) {
      this.favoritePokemons.splice(index, 1);
      this.removeFavorite.emit(pokemon); // Emitir evento para eliminar de favoritos
    }
  }

  openDialog(pokemon: any): void {
    const pokemonName = pokemon.name;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;

    this.http.get(apiUrl).subscribe((data: any) => {
      const dialogRef = this.dialog.open(FavoritePokemonDialogComponent, {
        width: '450px', // Aumenté el ancho para que quepa más información
        data: {
          name: data.name,
          baseExperience: data.base_experience,
          abilities: data.abilities.map((ability: any) => ability.ability.name),
          image: data.sprites.front_default, // URL de la imagen del Pokémon (front_default)
          image2D: data.sprites.back_default, // URL de la imagen 2D "back_default"
          type: data.types.map((type: any) => type.type.name).join(", "), // Tipos del Pokémon
          height: data.height / 10, // Altura en metros
          weight: data.weight / 10, // Peso en kilogramos
          // Agregamos información adicional
          // Información sobre las estadísticas del Pokémon
          stats: data.stats.map((stat: any) => `${stat.stat.name}: ${stat.base_stat}`).join(", "),
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    });
}
}