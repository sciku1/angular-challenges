import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ name() }}
      <button (click)="deleteOne()">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  readonly id = input.required<number>();
  readonly name = input.required<string>();
  readonly onDelete = input.required<(id: number) => void>();

  deleteOne = () => {
    console.log('DELETE ONE WHAAAT', this.id());
    const signal = this.onDelete();
    console.log('SIGNAL', signal);
    this.onDelete()(this.id());
  };
}
