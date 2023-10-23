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
        width: '250px',
        data: {
          name: data.name,
          baseExperience: data.base_experience,
          abilities: data.abilities.map((ability: any) => ability.ability.name)
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    });
  }
}