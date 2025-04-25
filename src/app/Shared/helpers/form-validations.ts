import { AbstractControl, FormArray } from '@angular/forms';


//for form validations
export function hasError(control: AbstractControl | null, errorName: string): boolean {
    return !!(control && control.touched && control.hasError(errorName));
}


//for contact
export function hasFormArrayError(
    formArray: FormArray,
    index: number,
    controlName: string,
    errorName: string
):boolean{
    const control = formArray.at(index).get(controlName);
    return !!(control && control.touched && control.hasError(errorName));
}