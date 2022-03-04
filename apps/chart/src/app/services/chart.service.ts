import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private basePath = 'https://api.binance.com/api/';

  constructor(private http: HttpClient) {}

  getChartData({ limit = 2000, symbol = 'BTCUSDT', interval = '1m' }) {
    return this.http
      .get<Array<Array<string | number>>>(this.basePath + 'v3/klines', {
        params: {
          limit,
          symbol,
          interval,
        },
      })
      .pipe(
        map((data) =>
          data.map(([time, open, high, low, close]) => ({
            time: time as string,
            open: Number(open),
            high: Number(high),
            low: Number(low),
            close: Number(close),
          }))
        )
      );
  }
}
