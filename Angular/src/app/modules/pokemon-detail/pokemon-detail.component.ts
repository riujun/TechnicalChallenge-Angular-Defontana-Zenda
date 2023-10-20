import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnChanges {
  @Input() selectedPokemon: any; // Cambia esto
  pokemonDetails: any;

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPokemon']) { // Cambia esto
      this.loadPokemonDetails();
    }
  }

  loadPokemonDetails() {
    if (this['selectedPokemon']) {
      const pokemonName = this['selectedPokemon']['name'];
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
  
      this.http.get(apiUrl).subscribe((data: any) => {
        this.pokemonDetails = data;
        console.log(data)
      });
    }
  }
}