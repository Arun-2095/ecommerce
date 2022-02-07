import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './component/input/input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ThemeModule } from '../theme.module';


@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    ThemeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [InputComponent]
})
export class ModuleCommonModule { }
