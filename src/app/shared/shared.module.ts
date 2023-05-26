import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';

import { SoloNumbersDirective } from './directives/solo-numbers.directive';
import { NumerosPuntoyComaDirective } from './directives/numeros-puntoy-coma.directive';
import { MascaraMonedaDirective } from './directives/mascara-moneda.directive';

const classesToInclude = [
  SoloNumbersDirective,
  NumerosPuntoyComaDirective,
  MascaraMonedaDirective
];

@NgModule({
  declarations: classesToInclude,
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: classesToInclude
})
export class SharedModule { }
