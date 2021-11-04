import { Component } from '@angular/core';
import { Registro } from 'src/app/models/registro.model';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-historial',
  templateUrl: 'historial.page.html',
  styleUrls: ['historial.page.scss']
})
export class HistorialPage {

  constructor( public dataLocal: DataLocalService ) {}

  sendEmail() {
    console.log('Enviando email');

  }

  openRegister(registro: Registro) {
    console.log('Detalle registro:',registro);
    this.dataLocal.openRegister(registro)
  }

}
