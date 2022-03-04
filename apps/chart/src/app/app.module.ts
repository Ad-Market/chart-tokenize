import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { HttpClientModule } from '@angular/common/http';
import { ResolutionSelectorComponent } from './components/resolution-selector/resolution-selector.component';
import { LoadingComponent } from './components/loading/loading.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { EditMenuComponent } from './components/edit-menu/edit-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ResolutionSelectorComponent,
    LoadingComponent,
    EditMenuComponent,
  ],
  imports: [BrowserModule, HttpClientModule, OverlayModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
