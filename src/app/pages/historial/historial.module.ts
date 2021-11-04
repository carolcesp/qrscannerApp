import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistorialPage } from './historial.page';

import { HistorialPageRoutingModule } from './historial-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HistorialPageRoutingModule
  ],
  declarations: [HistorialPage]
})
export class HistorialPageModule {}
