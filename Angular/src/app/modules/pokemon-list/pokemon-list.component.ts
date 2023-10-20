import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  selectedPokemon: any; // Declarar la propiedad para el Pokémon seleccionado

  pokemons: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalItems: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
    const offset = (this.currentPage - 1) * this.itemsPerPage;

    this.http.get(`${apiUrl}?offset=${offset}&limit=${this.itemsPerPage}`).subscribe((data: any) => {
      this.pokemons = data.results;
      this.totalItems = data.count;
      console.log(data)

    });
  }
  selectPokemon(pokemon: any) { // Método para seleccionar un Pokémon
    this.selectedPokemon = pokemon;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getPokemons();
  }
}