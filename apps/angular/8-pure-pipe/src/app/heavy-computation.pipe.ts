import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heavy',
})
export class HeavyComputationPipe implements PipeTransform {
  transform(value: string, index: number) {
    return `${value} - ${index}`;
  }
}
