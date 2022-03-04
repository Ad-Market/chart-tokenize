import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { resolutionOptions } from '../../constant';
import { Option } from '../../model';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { filter, takeUntil } from 'rxjs';
import { DestroyedService } from '../../services/destroyed.service';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'nhattt-resolution-selector',
  templateUrl: './resolution-selector.component.html',
  styleUrls: ['./resolution-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyedService],
})
export class ResolutionSelectorComponent implements OnInit, OnDestroy {
  @ViewChild('editTemplate', { static: true })
  editTemplate!: TemplateRef<unknown>;
  @ViewChild('btn', { static: true }) btn!: ElementRef;
  selectedOption: string = resolutionOptions[0].value;
  showOptions = resolutionOptions;
  overlayRef!: OverlayRef;
  showMenu = false;

  @Output() selectResolution = new EventEmitter<string>();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _overlay: Overlay,
    private _vcr: ViewContainerRef,
    private destroyedService: DestroyedService
  ) {}

  ngOnInit() {
    this.overlayRef = this._overlay.create({
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this.btn)
        .withPositions([
          {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
          },
          {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom',
          },
        ]),
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
    });
    this.overlayRef
      .outsidePointerEvents()
      .pipe(
        filter((event) => !this.btn.nativeElement.contains(event.target)),
        takeUntil(this.destroyedService)
      )
      .subscribe(() => {
        this.closeMenu();
      });
  }

  onSelectResolution(option: Option) {
    this.selectedOption = option.value;
    this.selectResolution.emit(option.value);
  }

  toggleMenu() {
    if (!this.showMenu) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  onChooseOption(value: string) {
    this.selectedOption = value;
    this.selectResolution.emit(value);
    this.closeMenu();
  }

  onSave(options: Option[]) {
    this.showOptions = [...options];
    this.closeMenu();
    this._cdr.markForCheck();
  }

  shouldShowSelectedOption() {
    return !this.showOptions.find(({ value }) => value === this.selectedOption);
  }

  private openMenu() {
    this.showMenu = true;
    if (!this.overlayRef.hasAttached()) {
      this.overlayRef.attach(new TemplatePortal(this.editTemplate, this._vcr));
    }
    this._cdr.markForCheck();
  }

  private closeMenu() {
    this.showMenu = false;
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
    this._cdr.markForCheck();
  }

  ngOnDestroy() {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
    this.overlayRef.dispose();
  }
}
