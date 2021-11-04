import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';

import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  saved: Registro[] = [];

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    public iab: InAppBrowser
    ) {

    this.init();
    //cargar registros guardados en el storage
    this.getStorage();
  }

  async init() {
    const strg = await this.storage.create();
    this.storage = strg;
  }

  async getStorage() {
    this.saved = await this.storage.get('historial') || [];
  }

  async saveRegister( format: string, text: string ) {
    await this.getStorage();

    const newRegister = new Registro( format, text );
    this.saved.unshift( newRegister );

    console.log('SAVED: ',this.saved);

    this.storage.set('historial', this.saved);

    this.openRegister( newRegister );
  }

  openRegister( registro: Registro) {
    this.navCtrl.navigateForward('/tabs/historial');


    switch (registro.type) {
      case 'http':
        this.iab.create(registro.text, '_system');
        break;

      default:
        break;
    }
  }

}
