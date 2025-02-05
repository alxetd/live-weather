import {WeatherComponent} from './weather.component';
import {MockBuilder, MockRender} from 'ng-mocks';
import {WeatherFacade} from '../../data-access/state/weather/weather.facade';
import {signal} from '@angular/core';

describe('WeatherComponent', () => {
  let component: WeatherComponent;

  beforeEach(() => MockBuilder(WeatherComponent)
    .mock(WeatherFacade, {
      error: signal(null),
      weather: signal(null)
    })
  );

  beforeEach(() => {
    const fixture = MockRender(WeatherComponent);
    component = fixture.point.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
