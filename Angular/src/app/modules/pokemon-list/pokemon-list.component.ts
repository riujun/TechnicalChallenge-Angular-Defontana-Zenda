import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  @Output() addFavorite = new EventEmitter<any>();

  selectedPokemon: any;
  favoritePokemons: any[] = [];
  pokemons: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalItems: number = 0;
  isSearching: boolean = false;
  searchQuery: string = '';

  // Nueva propiedad para la tabla resumen
  summary: { letter: string; count: number }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getPokemons();
  }
  onSearchChange(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.isSearching = !!this.searchQuery;
  
    // Permitir búsquedas con 1 palabra o más de 6 caracteres
    if (!this.searchQuery || this.searchQuery.length === 1 || this.searchQuery.length > 6) {
      this.getPokemons();
    }
  }

  resetSearch() {
    this.isSearching = false;  // Añade esta línea para indicar que ya no estás buscando
    this.searchQuery = ''; // Restablecer el campo de búsqueda
    this.getPokemons(); // Volver a obtener la lista de Pokémon
  }

  getPokemons() {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
    const offset = (this.currentPage - 1) * this.itemsPerPage;
  
    let apiUrlWithFilter = apiUrl;
    if (this.isSearching) {
      apiUrlWithFilter = `${apiUrl}?limit=${this.totalItems}`;
    } else {
      apiUrlWithFilter = `${apiUrl}?offset=${offset}&limit=${this.itemsPerPage}`;
    }
  
    this.http.get(apiUrlWithFilter).subscribe((data: any) => {
      if (this.isSearching) {
        this.pokemons = data.results
          .filter((pokemon: any) => pokemon.name.includes(this.searchQuery.toLowerCase()));
        this.totalItems = this.pokemons.length;
      } else {
        this.pokemons = data.results;
        this.totalItems = data.count;
      }
      this.generateSummary();
    });
  }

  selectPokemon(pokemon: any) {
    this.selectedPokemon = pokemon;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getPokemons();
  }

  markAsFavorite(pokemon: any) {
    if (!this.isFavorite(pokemon)) {
      this.favoritePokemons.push(pokemon);
      this.addFavorite.emit(pokemon);
    }
  }

  isFavorite(pokemon: any): boolean {
    return this.favoritePokemons.some((favPokemon) => favPokemon.name === pokemon.name);
  }

  generateSummary() {
    const letterCountMap: { [key: string]: number } = {};
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