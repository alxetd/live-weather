import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
  { path: 'weather', loadChildren: () => import('./domains/weather/routes').then(m => m.weatherRoutes) },
];
