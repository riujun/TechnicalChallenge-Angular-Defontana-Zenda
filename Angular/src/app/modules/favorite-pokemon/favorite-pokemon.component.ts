import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite-pokemon',
  templateUrl: './favorite-pokemon.component.html',
  styleUrls: ['./favorite-pokemon.component.css']
})
export class FavoritePokemonComponent {
  @Input() favoritePokemons: any[] = [];
  @Output() removeFavorite = new EventEmitter<any>(); // Evento para eliminar de favoritos

  // Elimina un Pokémon de la lista de favoritos
  removeFromFavorites(pokemon: any) {
    const index = this.favoritePokemons.indexOf(pokemon);
    if (index !== -1) {
      this.favoritePokemons.splice(index, 1);
      this.removeFavorite.emit(pokemon); // Emitir evento para eliminar de favoritos
    }
  }
  
}