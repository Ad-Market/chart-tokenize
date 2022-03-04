import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolutionSelectorComponent } from './resolution-selector.component';
import { MatIconModule } from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { EditMenuComponent } from '../edit-menu/edit-menu.component';
import { By } from '@angular/platform-browser';
import {resolutionOptions} from "../../constant";

describe('ResolutionSelectorComponent', () => {
  let component: ResolutionSelectorComponent;
  let fixture: ComponentFixture<ResolutionSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResolutionSelectorComponent, EditMenuComponent],
      imports: [MatIconModule],
      providers: [Overlay],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolutionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open and close on click', () => {
    const btn = fixture.debugElement.query(By.css('#btn'));
    btn.nativeElement.click();
    expect(component.showMenu).toEqual(true);
    btn.nativeElement.click();
    expect(component.showMenu).toEqual(false);
  });

  it('should close menu on click outside', () => {
    const btn = fixture.debugElement.query(By.css('#btn'));
    btn.nativeElement.click();
    expect(component.showMenu).toEqual(true);
    fixture.debugElement
      .query(By.css('.resolution-selector-item'))
      .nativeElement.click();
    expect(component.showMenu).toEqual(false);
  });

  it('should close menu on destroyed component', () => {
    const btn = fixture.debugElement.query(By.css('#btn'));
    btn.nativeElement.click();
    expect(component.showMenu).toEqual(true);
    component.ngOnDestroy();
    expect(component.overlayRef.hasAttached()).toEqual(false);
  });

  it('should change selected option on Choose Option', () => {
    const option = '1m';
    component.onChooseOption(option);
    expect(component.selectedOption).toEqual(option);
  });

  it('should change show option on save', () => {
    const result = resolutionOptions.filter(option => option.value !== '1m');
    component.onSave(result);
    expect(component.showOptions).toEqual(result);
  })
});
