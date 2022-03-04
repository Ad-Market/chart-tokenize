import { TestBed } from '@angular/core/testing';

import { Overlay } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { LoadingComponent } from '../components/loading/loading.component';
import { LoadingService } from './loading.service';

@NgModule({
  declarations: [LoadingComponent],
  entryComponents: [LoadingComponent],
})
class ScreenLoadingModule {}

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Overlay],
      imports: [ScreenLoadingModule],
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set loading when call startLoading fn', () => {
    service.startLoading();
    expect(service.loading).toEqual(true);
  });

  it('should set loading when call startLoading fn using loading$ observable', (done) => {
    service.startLoading();
    service.loading$.subscribe((loading) => {
      expect(loading).toEqual(true);
      done();
    });
  });

  it('should stop loading when call stopLoading fn', () => {
    service.startLoading();
    service.stopLoading();
    expect(service.loading).toEqual(false);
  });
});
