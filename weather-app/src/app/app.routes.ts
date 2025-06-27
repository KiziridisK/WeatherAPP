import { Routes } from '@angular/router';
import { HomePage } from './pages/home.page';
import { AboutPage } from './pages/about.page';
import { WeatherPage } from './pages/weather.page';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'weather/:city', component: WeatherPage },
  { path: 'about', component: AboutPage },
  { path: 'favorites', component: FavoritesComponent  },
  { path: '**', redirectTo: '' }
];
