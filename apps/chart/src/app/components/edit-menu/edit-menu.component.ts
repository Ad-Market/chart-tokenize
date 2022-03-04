import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { resolutionOptions } from '../../constant';
import { Option } from '../../model';

@Component({
  selector: 'nhattt-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditMenuComponent {
  @Input() showOptions: Array<Option> = resolutionOptions;
  resolutionOptions = resolutionOptions;
  editMode = false;

  @Output() save = new EventEmitter<Array<Option>>();
  @Output() chooseOption = new EventEmitter<string>();

  constructor(private cdr: ChangeDetectorRef) {}

  onEdit() {
    this.editMode = true;
    this.cdr.markForCheck();
  }

  onSave() {
    this.editMode = false;
    this.save.emit(this.showOptions);
  }

  toggleStatus(option: Option) {
    if (this.editMode) {
      if (this.showOptions.find(({ value }) => value === option.value)) {
        this.showOptions = this.showOptions.filter(
          ({ value }) => value !== option.value
        );
      } else {
        this.showOptions = this.resolutionOptions.filter((originalOption) => {
          if (originalOption.value === option.value) {
            return true;
          }
          return !!this.showOptions.find(
            (option) => option.value === originalOption.value
          );
        });
      }
    } else {
      this.chooseOption.next(option.value);
    }
  }

  isOptionSelected(option: Option) {
    return (
      this.editMode &&
      this.showOptions.find((showOption) => showOption.value === option.value)
    );
  }
}
