import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMascaraMoneda]'
})
export class MascaraMonedaDirective {
  limite = 13;
  decimales = 2;

  constructor(private elRef: ElementRef){}

  soloEnteros(value: string){
    value = value.replace(/([^0-9]+)/g,'');
    return value;
  }

  soloDecimales(value: string, decimales: number){
      value = value.replace(/([^0-9]+)/g,'');
      value = value.substr(0, decimales);
      return value;
  }

  remplazarDeInicio(value: string){
      value = value.replace(/^[0]/,''); // remplazar 0 al inicio
      value = value.replace(/^[\.]/,''); // remplazar . al inicio
      return value;
  }

  @HostListener('input', ['$event'])
  onChangeInput(event: Event):void{
    let value = this.elRef.nativeElement.value;
    let centavos = null;
    value = this.remplazarDeInicio(value);
    if(value.indexOf(".") != -1){
        let partes = value.split('.');
        value = this.soloEnteros(partes[0]);
        centavos = ".";
        if(partes[1]){
            centavos = centavos + this.soloDecimales(partes[1], this.decimales);
        }
    }else{
        value = this.soloEnteros(value);
        if(value.length >= this.limite){
          value = value.substr(0, this.limite);
        };
    }
    this.elRef.nativeElement.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (centavos ? centavos: "");
  }

  clearMask(value: string){
    let valor = value.replace(/([^0-9\.]+)/g,'');
    valor = parseFloat(valor).toFixed(2);
    return valor;
  }
}
