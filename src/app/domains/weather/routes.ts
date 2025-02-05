import {Routes} from '@angular/router';

export const weatherRoutes: Routes = [
  {
    path: "",
    loadComponent: () => import('./feature/weather/weather.component').then(m => m.WeatherComponent)
  }
]
