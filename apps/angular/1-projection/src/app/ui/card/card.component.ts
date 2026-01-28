import { Component, input } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="[card-image]"></ng-content>

      <section>
        @for (item of list(); track item) {
          <app-list-item
            [name]="getName()(item)"
            [id]="item.id"
            [onDelete]="onDelete()" />
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="onAdd()()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly customClass = input('');
  readonly onAdd = input.required<() => void>();
  readonly onDelete = input.required<(id: number) => void>();
  readonly getName = input.required<(item: any) => string>();
}
