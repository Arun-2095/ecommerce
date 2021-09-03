import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderDirective } from './loader.directive';

LoaderDirective

@NgModule({
  declarations: [LoaderDirective],
  imports: [
    CommonModule
  ],
  exports:[LoaderDirective]
})
export class DirectiveModule { }
