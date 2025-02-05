import {Component, computed, DestroyRef, inject, OnInit, Signal} from '@angular/core';
import {WeatherFacade} from '../../data-access/state/weather/weather.facade';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';
import {Weather} from '../../models/weather';

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

  form!: FormGroup;
  weather: Signal<Weather | null> = this.#weatherFacade.weather;
  error: Signal<string | null> = this.#weatherFacade.error;
  weatherCodeDescription : Signal<string | null> = computed(() => {
    if (!this.weather()) {
      return null;
    }

    const weather = this.weather() as Weather;

    if (weather.weatherCode === 0) {
      return 'Clear sky ☀️';
    } else if (weather.weatherCode >= 1 && weather.weatherCode <= 3) {
      return 'Partly cloudy ⛅';
    } else if ([45, 48].includes(weather.weatherCode)) {
      return 'Fog 🌫️';
    } else if(weather.weatherCode >= 51 && weather.weatherCode <= 57) {
      return 'Drizzle 🌧️';
    } else if(weather.weatherCode >= 61 && weather.weatherCode <= 67) {
      return 'Rain 🌧️';
    } else if(weather.weatherCode >= 71 && weather.weatherCode <= 77) {
      return 'Snowfall ❄️';
    } else if(weather.weatherCode >= 80 && weather.weatherCode <= 82) {
      return 'Showers 🌦️';
    } else if(weather.weatherCode >= 95 && weather.weatherCode <= 99) {
      return 'Thunderstorm ⛈️';
    }

    return null;
  });

  ngOnInit(): void {
    this.#initializeForm();
    this.#listenChanges();
  }

  #listenChanges(): void {
    this.form
      .valueChanges
      .pipe(
        debounceTime(500),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe((formValue) => {
        console.log(formValue);
        this.#weatherFacade.getWeather(formValue.city);
      });
  }

  #initializeForm(): void {
    this.form = new FormGroup({
      city: new FormControl<string>('')
    });
  }
}
