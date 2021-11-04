import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import SwiperCore from 'swiper';
import { IonicSwiper } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

SwiperCore.use([IonicSwiper]);
@Component({
  selector: 'app-scan',
  templateUrl: 'scan.page.html',
  styleUrls: ['scan.page.scss']
})

export class ScanPage {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private dataLocal: DataLocalService,
  ) {}

  ionViewWillEnter() {
    this.scan();
    // this.open()
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      if ( !barcodeData.cancelled ) {
        this.dataLocal.saveRegister( barcodeData.format, barcodeData.text)
      }

     }).catch(err => {
         console.error(err);

        //  prueba para desarrollo
         this.dataLocal.saveRegister( 'QRCode', 'https://www.linkedin.com/in/carolina-cespedes-ortiz/')
     });
  }


}
