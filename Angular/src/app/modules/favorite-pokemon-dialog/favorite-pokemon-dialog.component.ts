import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-favorite-pokemon-dialog',
  templateUrl: './favorite-pokemon-dialog.component.html',
  styleUrls: ['./favorite-pokemon-dialog.component.css']
})
export class FavoritePokemonDialogComponent {
  showFrontImage = true; // Propiedad para alternar entre la imagen frontal y trasera del Pokémon

  constructor(
    public dialogRef: MatDialogRef<FavoritePokemonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  flipImage(): void {
    this.showFrontImage = !this.showFrontImage;
  }
}