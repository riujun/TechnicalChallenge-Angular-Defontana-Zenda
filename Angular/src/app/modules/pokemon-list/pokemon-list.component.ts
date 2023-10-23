import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  @Output() addFavorite = new EventEmitter<any>(); // Evento para agregar a favoritos

  
  selectedPokemon: any; // Declarar la propiedad para el Pokémon seleccionado
  favoritePokemons: any[] = [];
  pokemons: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalItems: number = 0;

  // Nueva propiedad para la tabla resumen
  summary: { letter: string; count: number }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getPokemons();
    console.log(this.favoritePokemons)
  }

  getPokemons() {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
    const offset = (this.currentPage - 1) * this.itemsPerPage;

    this.http.get(`${apiUrl}?offset=${offset}&limit=${this.itemsPerPage}`).subscribe((data: any) => {
      this.pokemons = data.results;
      this.totalItems = data.count;

      // Generar la tabla resumen al recibir los datos
      this.generateSummary();

    });
  }
 

  

  selectPokemon(pokemon: any) { // Método para seleccionar un Pokémon
    this.selectedPokemon = pokemon;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getPokemons();
  }
  markAsFavorite(pokemon: any) {
    if (!this.isFavorite(pokemon)) {
      this.favoritePokemons.push(pokemon);
      this.addFavorite.emit(pokemon); // Emitir evento para agregar a favoritos
    }
  }

  isFavorite(pokemon: any): boolean {
    return this.favoritePokemons.some((favPokemon) => favPokemon.name === pokemon.name);
  }

  

  // Método para generar la tabla resumen
  generateSummary() {
    const letterCountMap: { [key: string]: number } = {}; // Especifica el tipo de letterCountMap
    this.pokemons.forEach((pokemon: any) => {
      const firstLetter = pokemon.name[0].toUpperCase();
      if (letterCountMap[firstLetter]) {
        letterCountMap[firstLetter]++;
      } else {
        letterCountMap[firstLetter] = 1;
      }
    });
  
    this.summary = Object.keys(letterCountMap).map((letter) => ({
      letter,
      count: letterCountMap[letter],
    }));
  }
  
}