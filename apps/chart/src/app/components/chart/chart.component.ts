import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { createChart, ISeriesApi } from 'lightweight-charts';
import { ChartService } from '../../services/chart.service';
import {
  chartOption,
  mainChartOption,
  resolutionOptions,
} from '../../constant';
import { BehaviorSubject, finalize, switchMap, takeUntil } from 'rxjs';
import { DestroyedService } from '../../services/destroyed.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'nhattt-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyedService],
})
export class ChartComponent implements OnInit {
  @ViewChild('container', { static: true }) child!: ElementRef;
  selectedOption$ = new BehaviorSubject<string>(resolutionOptions[0].value);
  candleSeries!: ISeriesApi<'Candlestick'>;

  constructor(
    private chartService: ChartService,
    private destroyedService: DestroyedService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const chart = createChart(this.child.nativeElement, {
      width: this.child.nativeElement.offsetWidth,
      height: this.child.nativeElement.offsetHeight,
      ...mainChartOption,
    });
    this.candleSeries = chart.addCandlestickSeries(chartOption);

    this.selectedOption$
      .pipe(
        switchMap((option) => {
          this.loadingService.startLoading();
          return this.chartService.getChartData({
            interval: option === 'Time' ? '1m' : option,
          });
        }),
        finalize(() => this.loadingService.stopLoading()),
        takeUntil(this.destroyedService)
      )
      .subscribe((data) => {
        this.candleSeries.setData(data);
        this.loadingService.stopLoading();
      });
  }

  onSelectResolution(value: string) {
    this.selectedOption$.next(value);
  }
}
