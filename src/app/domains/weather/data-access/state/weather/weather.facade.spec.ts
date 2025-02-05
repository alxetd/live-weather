import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockBuilder } from 'ng-mocks';
import {weatherFeature, WeatherState} from './weather.state';
import {WeatherFacade} from './weather.facade';
import {weatherMock} from '../../../mocks/weather.mock';
import {weatherActions} from './weather.actions';

describe('WeatherFacade', () => {
  let facade: WeatherFacade;
  let store: MockStore<WeatherState>;

  beforeEach(async () => {
    await MockBuilder(WeatherFacade).provide(provideMockStore());

    facade = TestBed.inject(WeatherFacade);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  describe('selectors', () => {
    it('should select weather from store', () => {
      store.overrideSelector(weatherFeature.selectWeather, weatherMock);
      expect(facade.weather()).toEqual(weatherMock);
    });

    it('should select error from store', () => {
      const errorMessage = 'City not found';

      store.overrideSelector(weatherFeature.selectError, errorMessage);
      expect(facade.error()).toEqual(errorMessage);
    });
  });

  describe('dispatches', () => {
    it('should dispatch getWeather', () => {
      spyOn(store, 'dispatch');
      facade.getWeather(weatherMock.city);

      expect(store.dispatch).toHaveBeenCalledOnceWith(
        weatherActions.getWeather({ city: weatherMock.city })
      );
    });
  });
});
