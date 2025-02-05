import {Component, computed, DestroyRef, inject, OnInit, Signal} from '@angular/core';
import {WeatherFacade} from '../../data-access/state/weather/weather.facade';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';
import {Weather} from '../../models/weather';

interface WeatherForm {
  city: FormControl;
}

@Component({
  selector: 'app-weather',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
  standalone: true
})
export class WeatherComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef);
  readonly #weatherFacade = inject(WeatherFacade);

  form!: FormGroup<WeatherForm>;
  weather: Signal<Weather | null> = this.#weatherFacade.weather;
  isLoading: Signal<boolean> = this.#weatherFacade.isLoading;
  error: Signal<string | null> = this.#weatherFacade.error;
  weatherCodeDescription : Signal<string | null> = computed(() => {
    return this.weather() ? this.#getWeatherConditions((this.weather() as Weather).weatherCode) : null;
  });
  showLoadingState: boolean = false;

  ngOnInit(): void {
    this.#initializeForm();
    this.#listenChanges();
  }

  toggleShowLoadingState(): void {
    this.#weatherFacade.unsetWeather();
    this.showLoadingState = !this.showLoadingState;
  }

  #listenChanges(): void {
    this.form
      .valueChanges
      .pipe(
        debounceTime(500),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe((formValue) => {
        this.#weatherFacade.getWeather(formValue.city.trim());
        this.showLoadingState = false;
      });
  }

  #initializeForm(): void {
    this.form = new FormGroup({
      city: new FormControl<string>('')
    });
  }

  #getWeatherConditions(code: number): string | null {
    if (code === 0) {
      return 'Clear sky ☀️';
    } else if (code >= 1 && code <= 3) {
      return 'Partly cloudy ⛅';
    } else if ([45, 48].includes(code)) {
      return 'Fog 🌫️';
    } else if(code >= 51 && code <= 57) {
      return 'Drizzle 🌧️';
    } else if(code >= 61 && code <= 67) {
      return 'Rain 🌧️';
    } else if(code >= 71 && code <= 77) {
      return 'Snowfall ❄️';
    } else if(code >= 80 && code <= 82) {
      return 'Showers 🌦️';
    } else if(code >= 95 && code <= 99) {
      return 'Thunderstorm ⛈️';
    }

    return null;
  }
}
