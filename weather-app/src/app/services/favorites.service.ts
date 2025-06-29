import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { WeatherData } from '../models/weather.model';
@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private storageKey = 'favoriteCities';
  
  constructor() { }

  public getFavorites(): WeatherData[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  public addFavorites(city: WeatherData) {
    const favorites = this.getFavorites();
    console.log('favorites', favorites);
    if(favorites) {
      const index = _.findIndex(favorites, (f) => f.name === city.name);
      console.log('index of favorite', index)
      if(index === -1) {
        favorites.push(city); 
      } else {
        favorites[index] = city;
      } 
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  public removeFavorite(city: WeatherData) {
    let favorites = this.getFavorites();
    favorites = _.filter(favorites, (f) => f.name !== city.name);
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));

  }

  public isFavorite(city: WeatherData): boolean {
    console.log('fav', this.getFavorites());
    console.log('this.getFavorites().includes(city)',this.getFavorites().includes(city));
    return this.getFavorites().includes(city);
  }
}
