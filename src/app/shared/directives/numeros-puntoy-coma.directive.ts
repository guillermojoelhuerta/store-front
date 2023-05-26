import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumerosPuntoyComa]'
})
export class NumerosPuntoyComaDirective {

  constructor(private elRef: ElementRef){}

  @HostListener('input', ['$event'])
  onChangeInput(event: Event):void{
    const numberPuntoYComa = /[^0-9.,]*/g;
    const initValue = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value = initValue.replace(numberPuntoYComa, '');
    if(initValue !== this.elRef.nativeElement.value){
      event.stopPropagation();
    }
  }

  /*
  constructor(private ngControl: NgControl) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = [8, 9, 13, 27, 46, 110, 190]; // teclas permitidas (backspace, tab, enter, escape, delete, punto, punto del teclado numérico)
    if (allowedKeys.indexOf(event.keyCode) !== -1) {
      return; // permitir teclas especiales
    }
    if (event.keyCode < 48 || event.keyCode > 57) {
      event.preventDefault(); // evitar cualquier otro caracter no numérico
    }
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.ngControl.control?.setValue(value.replace(/[^0-9]/g, ''));
  }*/
}
