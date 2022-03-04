import { TestBed } from '@angular/core/testing';

import { ChartService } from './chart.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

const API_URL =
  'https://api.binance.com/api/v3/klines?limit=2000&symbol=BTCUSDT&interval=1m';
const mockData = [
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
];

describe('ChartService', () => {
  let service: ChartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ChartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get klines data successfully', (done) => {
    const expectedResult = mockData.map(([time, open, high, low, close]) => ({
      time: time as string,
      open: Number(open),
      high: Number(high),
      low: Number(low),
      close: Number(close),
    }));

    service.getChartData({}).subscribe((data) => {
      expect(data).toEqual(expectedResult);
      done();
    });
    const req = httpMock.expectOne(API_URL);
    req.flush(mockData);
  });
});
