import { TestBed } from '@angular/core/testing';

import { HeaderInterceptorInterceptor } from './header-interceptor.interceptor';

describe('HeaderInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HeaderInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HeaderInterceptorInterceptor = TestBed.inject(HeaderInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
