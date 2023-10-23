import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-favorite-pokemon',
  templateUrl: './favorite-pokemon.component.html',
  styleUrls: ['./favorite-pokemon.component.css']
})
export class FavoritePokemonComponent {
  @Input() favoritePokemons: any[] = [];
  @Output() removeFavorite = new EventEmitter<any>(); // Evento para eliminar de favoritos

  constructor(private http: HttpClient) {}

  removeFromFavorites(pokemon: any) {
    const index = this.favoritePokemons.indexOf(pokemon);
    if (index !== -1) {
      this.favoritePokemons.splice(index, 1);
      this.removeFavorite.emit(pokemon); // Emitir evento para eliminar de favoritos
    }
  }

  showFavoriteDetails(favorite: any) {
    if (!favorite.details) {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${favorite.name}/`;

      this.http.get(apiUrl).subscribe((data: any) => {
        favorite.details = data;
        favorite.showDetails = true;
      });
    } else {
      favorite.showDetails = !favorite.showDetails;
    }
  }
}