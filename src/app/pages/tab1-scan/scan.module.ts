import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScanPage } from './scan.page';

import { ScanPageRoutingModule } from './scan-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ScanPageRoutingModule
  ],
  declarations: [ScanPage]
})
export class ScanPageModule {}
