import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appSoloNumbers]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: SoloNumbersDirective, multi: true }
  ]
})
export class SoloNumbersDirective implements Validator{

  static validaNumber(c: AbstractControl): ValidationErrors | null {
    const regExp = /^[0-9]*$/;
    const isValid = regExp.test(c.value);
    return isValid ? null : { 'soloNumeros': true };
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return SoloNumbersDirective.validaNumber(c);
  }
}
