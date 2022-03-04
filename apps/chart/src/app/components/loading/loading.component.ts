import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nhattt-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {}
