import { Pipe, PipeTransform } from '@angular/core';
import { Specie } from '../../models/enums';

@Pipe({
  name: 'specie'
})
export class SpeciePipe implements PipeTransform {

  transform(value: Specie): string {
    
    switch (value) {

      case Specie.Cat:
        return 'Cat';

      case Specie.Dog:
        return 'Dog';
      default:
        return 'Unknown';
    }
  }

}
