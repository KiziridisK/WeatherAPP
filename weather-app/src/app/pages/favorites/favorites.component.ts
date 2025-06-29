import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { WeatherData } from '../../models/weather.model';
import { WeatherItemComponent } from '../weather/weather-item/weather-item.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms'; 
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-favorites',
  imports: [
    CommonModule,
    WeatherItemComponent,
    MatIconModule,
    MatTableModule,
    MatButtonToggleModule,
    FormsModule,
    MatTooltipModule,
    TranslatePipe
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit{
  public noFavorites: boolean = true;
  public favorites: WeatherData[] = []
  public displayMode: 'cards' | 'table' = 'cards';
  public displayedColumns: string[] = ['city', 'temp', 'weather', 'actions'];

  constructor(
    private favoritesService: FavoritesService
  ) {

  }

  ngOnInit(): void {
    this.load();
    
  }

  private load() {

    this.favorites = this.favoritesService.getFavorites();
    if(this.favorites?.length !== 0) {
      this.noFavorites = false;
    }

  }

  public removeFavorite(city: WeatherData) {
    console.log('remove', city)
    this.favoritesService.removeFavorite(city);
    this.favorites = this.favoritesService.getFavorites();
  }
}
