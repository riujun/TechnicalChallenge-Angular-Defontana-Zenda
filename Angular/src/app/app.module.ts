import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'; // Agrega esta línea
import { MatDialogModule } from '@angular/material/dialog';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './modules/pokemon-list/pokemon-list.component';
import { AlphabetSummaryComponent } from './modules/alphabet-summary/alphabet-summary.component';
import { FavoritePokemonComponent } from './modules/favorite-pokemon/favorite-pokemon.component';
import { SharedComponent } from './modules/shared/shared.component';
import { PokemonDetailComponent } from './modules/pokemon-detail/pokemon-detail.component';
import { FavoritePokemonDialogComponent } from './modules/favorite-pokemon-dialog/favorite-pokemon-dialog.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    AlphabetSummaryComponent,
    FavoritePokemonComponent,
    SharedComponent,
    PokemonDetailComponent,
    FavoritePokemonDialogComponent,
    HomeComponent,
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,    HttpClientModule, // Agrega HttpClientModule a los módulos importados
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }