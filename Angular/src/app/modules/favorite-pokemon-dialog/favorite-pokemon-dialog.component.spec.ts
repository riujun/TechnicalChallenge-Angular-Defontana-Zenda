import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePokemonDialogComponent } from './favorite-pokemon-dialog.component';

describe('FavoritePokemonDialogComponent', () => {
  let component: FavoritePokemonDialogComponent;
  let fixture: ComponentFixture<FavoritePokemonDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritePokemonDialogComponent]
    });
    fixture = TestBed.createComponent(FavoritePokemonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
