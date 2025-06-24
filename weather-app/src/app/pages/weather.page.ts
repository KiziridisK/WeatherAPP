import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../models/weather.model';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  standalone: true,
  selector: 'app-weather',
  imports: [
    CommonModule, 
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './weather.page.html',
  styleUrl: './weather.page.scss'
})

export class WeatherPage implements OnInit {
  public weatherData: WeatherData | null = null;
  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
   ) {

  }

  ngOnInit(): void {
    console.log('this.route',this.route);
    console.log('this.route.snapshot',this.route.snapshot);
    const city = this.route.snapshot.paramMap.get('city');
    if (city) {
      this.weatherService.getWeatherByCity(city).subscribe({
        next: (data) => {
          this.weatherData = data;
          console.log('this.weatherData',this.weatherData)
        },
        error: (err) => console.error('Failed to fetch weather', err),
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

}
