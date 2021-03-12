import { NgModule } from '@angular/core';
import { MatButtonModule} from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';

const MaterialModules = [MatButtonModule, MatToolbarModule, MatIconModule , 
  MatSidenavModule,MatMenuModule, MatListModule, MatGridListModule , MatCardModule]

@NgModule({
  declarations: [],
  exports:[MaterialModules]
})
export class ThemeModule { }
