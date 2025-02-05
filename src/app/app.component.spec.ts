import { MockBuilder, MockRender } from 'ng-mocks';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => MockBuilder(AppComponent));

  beforeEach(() => {
    const fixture = MockRender(AppComponent);
    component = fixture.point.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
