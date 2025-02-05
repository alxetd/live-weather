import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import {NominatiumResponse, OpenMeteoResponse, WeatherService} from '../../services/weather.service';
import { weatherActions } from './weather.actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const getWeather = createEffect(
  (actions$ = inject(Actions), weatherService = inject(WeatherService)) =>
    actions$.pipe(
      ofType(weatherActions.getWeather),
      switchMap(({ city }) =>
        weatherService.getNominatium(city).pipe(
          switchMap((nominatiumResponse: NominatiumResponse[]) => {
            const firstCity: NominatiumResponse = nominatiumResponse[0];

            if (!firstCity) {
              return of(weatherActions.getWeatherFailure({ message: 'City not found!' }))
            }

            return weatherService.getWeather(firstCity.lat, firstCity.lon).pipe(
              map((openMeteoResponse: OpenMeteoResponse) => weatherActions.getWeatherSuccess({
                city: firstCity.display_name,
                openMeteoResponse
              })),
              catchError((error: string) => of(weatherActions.getWeatherFailure({ message: error })))
            )
          }),
          catchError((error: string) => of(weatherActions.getWeatherFailure({ message: error })))
        )
      )
    ),
  { functional: true }
);
