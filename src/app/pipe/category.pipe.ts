import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'MAIN': return 'Főétel';
      case 'DESSERT': return 'Desszert';
      case 'BREAKFAST': return 'Reggeli';
      case 'OTHER': return 'Egyéb';
    }
  }

}
