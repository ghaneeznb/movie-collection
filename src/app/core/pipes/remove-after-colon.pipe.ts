import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeAfterColon'
})
export class RemoveAfterColonPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return value.split(':')[0];
  }

}
