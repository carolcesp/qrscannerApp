import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';

import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  saved: Registro[] = [];

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    public iab: InAppBrowser,
    private file: File,
    private emailComposer: EmailComposer
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

      // case 'geo':
      // this.navCtrl.navigateForward('')
      // break;

      default:
        break;
    }
  }

  sendEmail() {
    const arrTemp = [];
    const titulos = 'Tipo, Formato, Creado en, Texto\n';

    arrTemp.push( titulos );

    this.saved.forEach( registro => {
      const linea = `${ registro.type },${ registro.format },${ registro.created },${ registro.text } \n`;

      arrTemp.push( linea );
      this.generateCSV(arrTemp.join(''));
    });
  }

  generateCSV(text: string) {
    this.file.checkDir(this.file.dataDirectory, 'registros.csv')
      .then( existe => {
        return this.writeFile(text)
      })
      .catch(err => {
        console.error('No existe fichero',err);
        return this.file.createFile(this.file.dataDirectory, 'registros.csv', false)
          .then( existe => { this.writeFile( text )})
          .catch(err2 => { console.error('No se ha generado el fichero',err) })
      })
  }

  async writeFile(text: string) {
    await this.file.writeExistingFile( this.file.dataDirectory, 'registros.csv', text)
    const archivo = `${this.file.dataDirectory}/registros.csv`;

    const email = {
      to: 'carolinacespedes90@gmail.com',
      cc: 'carolinacespedes90@gmail.com',
      attachments: [
        archivo
      ],
      subject: 'Backup scan',
      body: 'Aqui tienes tu backup de los scans - <strong>QRScanner</strong>',
      isHtml: true
    };

    this.emailComposer.open(email);
  }

}
