import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import SwiperCore from 'swiper';
import { IonicSwiper } from '@ionic/angular';

SwiperCore.use([IonicSwiper]);
@Component({
  selector: 'app-scan',
  templateUrl: 'scan.page.html',
  styleUrls: ['scan.page.scss']
})

export class ScanPage {

  constructor(
    private barcodeScanner: BarcodeScanner
  ) {}

  ionViewWillEnter() {
    this.scan();
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
