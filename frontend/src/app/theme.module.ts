import { NgModule } from '@angular/core';
import { MatButtonModule} from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatNativeDateModule} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';

const MaterialModules = [MatButtonModule, MatToolbarModule, MatIconModule , 
  MatSidenavModule,MatMenuModule, MatListModule, MatGridListModule , MatCardModule, MatInputModule, MatFormFieldModule,MatRadioModule,
  MatTableModule,MatBadgeModule,MatExpansionModule,MatDatepickerModule,MatNativeDateModule,MatChipsModule]

@NgModule({
  declarations: [],
  exports:[MaterialModules]
})

export class ThemeModule { }
