import {inject, Injectable, Signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {weatherActions} from './weather.actions';
import {weatherFeature} from './weather.state';
import {Weather} from '../../../models/weather';

@Injectable({ providedIn: 'root' })
export class WeatherFacade {
  readonly #store: Store = inject(Store);

  get weather(): Signal<Weather | null> {
    return this.#store.selectSignal(weatherFeature.selectWeather);
  }

  get isLoading(): Signal<boolean> {
    return this.#store.selectSignal(weatherFeature.selectIsLoading);
  }

  get error(): Signal<string | null> {
    return this.#store.selectSignal(weatherFeature.selectError);
  }

  getWeather(city: string): void {
    this.#store.dispatch(weatherActions.getWeather({ city }))
  }

  unsetWeather(): void {
    this.#store.dispatch(weatherActions.unsetWeather())
  }
}
