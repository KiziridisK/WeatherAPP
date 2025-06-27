import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../../../services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from '../../../services/favorites.service';
import { WeatherData } from '../../../models/weather.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-weather-item',
  imports: [
    CommonModule, 
    MatCardModule,
    MatDividerModule,
    MatIcon,
    MatProgressSpinnerModule
  ],
  templateUrl: './weather-item.component.html',
  styleUrl: './weather-item.component.scss'
})
export class WeatherItemComponent implements OnInit {

  @Input() weatherData: WeatherData | null = null;
  @Input() fromFavorites: boolean = false;
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
