import { Pipe, PipeTransform } from '@angular/core';
import { Gender, Specie } from '../../models/enums';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: Gender): string  {
    switch(value){
      case Gender.Male:
        return 'Male';
        case Gender.Female:
          return 'Female';
        default:
          return 'Unknown'; // Return 'Unknown' if value doesn't match the enum
        }
      }
  }
