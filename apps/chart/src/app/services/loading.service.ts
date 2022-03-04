import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { LoadingComponent } from '../components/loading/loading.component';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadingStatus = new BehaviorSubject<boolean>(false);
  overlayRef: OverlayRef;
  componentPortal: ComponentPortal<LoadingComponent>;

  constructor(private overlay: Overlay) {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      backdropClass: 'backdrop-loading',
    });

    this.componentPortal = new ComponentPortal(LoadingComponent);
  }

  show() {
    this.overlayRef.attach<LoadingComponent>(this.componentPortal);
  }

  hide() {
    this.overlayRef.detach();
  }

  get loading$(): Observable<boolean> {
    return this.loadingStatus.asObservable();
  }

  get loading(): boolean {
    return this.loadingStatus.value;
  }

  set loading(value) {
    this.loadingStatus.next(value);
  }

  startLoading() {
    this.show();
    this.loading = true;
  }

  stopLoading() {
    this.hide();
    this.loading = false;
  }
}
