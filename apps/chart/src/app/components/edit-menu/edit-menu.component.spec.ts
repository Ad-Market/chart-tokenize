import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMenuComponent } from './edit-menu.component';
import { By } from '@angular/platform-browser';

describe('EditMenuComponent', () => {
  let component: EditMenuComponent;
  let fixture: ComponentFixture<EditMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should move to edit mode on click edit', () => {
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('.edit-container-header-button'))
      .nativeElement.click();
    expect(component.editMode).toEqual(true);
  });

  it('should move to normal mode on click save', () => {
    component.editMode = true;
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('.edit-container-header-button'))
      .nativeElement.click();

    expect(component.editMode).toEqual(false);
  });

  it('should emit choose option if not in edit mode', () => {
    component.editMode = false;
    fixture.detectChanges();
    jest.spyOn(component.chooseOption, 'emit');
    fixture.debugElement
      .query(By.css('.edit-container-option-item-wrapper'))
      .nativeElement.click();
    expect(component.chooseOption.emit).toHaveBeenCalledTimes(0);
  });

  it('should change view array when toggle item in edit mode', () => {
    component.editMode = true;
    fixture.detectChanges();
    fixture.debugElement
      .query(By.css('.edit-container-option-item-wrapper'))
      .nativeElement.click();
    expect(component.showOptions).toEqual(
      component.resolutionOptions.filter((e, i) => i !== 0)
    );
    fixture.debugElement
      .query(By.css('.edit-container-option-item-wrapper'))
      .nativeElement.click();
    expect(component.showOptions).toEqual(component.resolutionOptions);
  });
});
