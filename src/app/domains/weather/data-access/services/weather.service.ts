import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export type NominatiumResponse = {
  lat: string;
  lon: string;
  display_name: string;
}

export type OpenMeteoResponse = {
  current_weather: {
    interval: number;
    is_day: number;
    temperature: number;
    time: string;
    weathercode: number;
    winddirection: number;
    windspeed: number;
  },
  current_weather_units: {
    temperature: string;
    windspeed: string;
  },
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  readonly #http = inject(HttpClient);

  getNominatium(city: string): Observable<NominatiumResponse[]> {
    const API_URL = `https://nominatim.openstreetmap.org/search?q=${city}&format=json`;

    return this.#http.get<NominatiumResponse[]>(API_URL);
  }

  getWeather(latitude: string, longitude: string): Observable<OpenMeteoResponse> {
    const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&current=relative_humidity_2m`;

    return this.#http.get<OpenMeteoResponse>(API_URL);
  }
}
