import {createFeature, createReducer, on} from '@ngrx/store';
import {weatherActions} from './weather.actions';
import {Weather} from '../../../models/weather';

export interface WeatherState {
  weather: Weather | null;
  error: string | null;
  isLoading: boolean;
}

export const initialState: WeatherState = {
  weather: null,
  error: null,
  isLoading: false
}

export const weatherFeature = createFeature({
  name: 'Weather',
  reducer: createReducer(
    initialState,
    on(weatherActions.getWeather, (state: WeatherState) => ({
      ...state,
      isLoading: true,
      weather: null,
      error: null,
    })),
    on(weatherActions.getWeatherSuccess, (state: WeatherState, { city, openMeteoResponse }) => ({
      ...state,
      isLoading: false,
      weather: {
        ...state.weather,
        city,
        temperature: openMeteoResponse.current_weather.temperature,
        temperatureUnit: openMeteoResponse.current_weather_units.temperature,
        humidity: 80,
        humidityUnit: '%',
        windSpeed: openMeteoResponse.current_weather.windspeed,
        windSpeedUnit: openMeteoResponse.current_weather_units.windspeed,
        weatherCode: openMeteoResponse.current_weather.weathercode,
      }
    })),
    on(weatherActions.getWeatherFailure, (state: WeatherState, { message }) => ({
      ...state,
      isLoading: false,
      error: message
    })),
    on(weatherActions.unsetWeather, (state: WeatherState) => ({
      ...state,
      weather: null,
      error: null,
    }))
  )
});
