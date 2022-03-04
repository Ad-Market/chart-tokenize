import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Overlay } from '@angular/cdk/overlay';
import { ResolutionSelectorComponent } from '../resolution-selector/resolution-selector.component';
import { MatIconModule } from '@angular/material/icon';
import { ChartService } from '../../services/chart.service';
import { of } from 'rxjs';
import {resolutionOptions} from "../../constant";

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const chartServiceSpy = {
  getChartData: jest.fn(),
};

chartServiceSpy.getChartData.mockReturnValue(
  of([
    [
      1646421300000,
      '0.04433000',
      '0.04438000',
      '0.04430000',
      '0.04434000',
      '60018.00000000',
      1646421479999,
      '2661.03828000',
      16,
      '50355.00000000',
      '2232.72973000',
      '0',
    ],
  ])
);

describe('LoadingComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartComponent, ResolutionSelectorComponent],
      imports: [HttpClientTestingModule, MatIconModule],
      providers: [
        Overlay,
        {
          provide: ChartService,
          useValue: chartServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selected resolution on call', () => {
    component.onSelectResolution(resolutionOptions[0].value);
    expect(component.selectedOption$.value).toEqual(resolutionOptions[0].value);
  })
});
