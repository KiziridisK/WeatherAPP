import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../models/weather.model';
import { MatDividerModule } from '@angular/material/divider';
import { FavoritesService } from '../services/favorites.service';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WeatherItemComponent } from './weather/weather-item/weather-item.component';
@Component({
  standalone: true,
  selector: 'app-weather',
  imports: [
    CommonModule, 
    MatCardModule,
    MatDividerModule,
    MatIcon,
    MatProgressSpinnerModule,
    WeatherItemComponent
  ],
  templateUrl: './weather.page.html',
  styleUrl: './weather.page.scss'
})

export class WeatherPage implements OnInit {
  public weatherData: WeatherData | null = null;
  public loading: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private favoritesService: FavoritesService
   ) {

  }

  ngOnInit(): void {
    console.log('this.route',this.route);
    console.log('this.route.snapshot',this.route.snapshot);
    const city = this.route.snapshot.paramMap.get('city');
    if (city) {
      this.loading = true;
      this.weatherService.getWeatherByCity(city).subscribe({
        next: (data) => {
          this.weatherData = data;
          this.loading = false;
          console.log('this.weatherData',this.weatherData)
        },
        error: (err) => {
          this.loading = false
          console.error('Failed to fetch weather', err)
        },
      });
    }
  }

  formatTime(timestamp: number): string {
    if(this.weatherData?.timezone) {
      const date = new Date((timestamp + this.weatherData?.timezone) * 1000);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return ''
    }
  }

  public isFavorite(): boolean {
    return this.weatherData ? this.favoritesService.isFavorite(this.weatherData): false;
  }

  addToFavorites() {
    if (this.weatherData) {
      this.favoritesService.addFavorites(this.weatherData);
    }
  }
  
}
