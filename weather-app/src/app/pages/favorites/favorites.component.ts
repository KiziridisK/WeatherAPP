import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { WeatherData } from '../../models/weather.model';
import { WeatherItemComponent } from '../weather/weather-item/weather-item.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-favorites',
  imports: [
    CommonModule,
    WeatherItemComponent,
    MatIconModule
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit{
  public noFavorites: boolean = true;
  public favorites: WeatherData[] = []
  constructor(
    private favoritesService: FavoritesService
  ) {

  }

  ngOnInit(): void {
    this.load();
    
  }

  private load() {

    // this.favorites = this.favoritesService.getFavorites();
    // if(this.favorites?.length !== 0) {
    //   this.noFavorites = false;
    // }

  }
}
