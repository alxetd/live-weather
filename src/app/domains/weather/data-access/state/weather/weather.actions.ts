import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {OpenMeteoResponse} from '../../services/weather.service';

export const weatherActions = createActionGroup({
  source: 'Weather',
  events: {
    'Get Weather': props<{ city: string }>(),
    'Get Weather Success': props<{ city: string; openMeteoResponse: OpenMeteoResponse }>(),
    'Get Weather Failure': props<{ message: string }>(),
    'Unset Weather': emptyProps()
  }
});
