import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = ''; 
  // Replace with your key


  constructor(
    private httpClient: HttpClient,
  ) { }

  getWeatherByCity(city: String): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&units=metric&appid=${this.apiKey}`;
     return this.httpClient.get(url).pipe(
      catchError((error) => {
        console.error('Weather API error:', error);
        return throwError(() => error);
      })
    );
  }


}
