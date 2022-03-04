import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { DestroyedService } from './destroyed.service';

@Component({
  selector: 'nhattt-test-component',
  template: `<div></div>`,
  providers: [DestroyedService],
})
export class TestComponent {
  constructor(public destroyService: DestroyedService) {}
}

@Component({
  selector: 'nhattt-host-component',
  template: `<nhattt-test-component *ngIf="show"></nhattt-test-component>`,
})
export class HostComponent {
  show = true;
  @ViewChild(TestComponent) testComp!: TestComponent;
}

describe('DestroyService', () => {
  let componentHost: HostComponent;
  let fixtureHost: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, TestComponent],
    });
  });

  beforeEach(() => {
    fixtureHost = TestBed.createComponent(HostComponent);
    componentHost = fixtureHost.componentInstance;
    fixtureHost.detectChanges();
  });

  it('should create an instance', () => {
    expect(componentHost).toBeTruthy();
  });

  it('should be able to destroy observable', () => {
    expect(componentHost.testComp).toBeTruthy();
    componentHost.show = false;
    fixtureHost.detectChanges();
    expect(componentHost.testComp).toBeFalsy();
  });
});
