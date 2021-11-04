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
    this.dataLocal.sendEmail();
  }

  openRegister(registro: Registro) {
    this.dataLocal.openRegister(registro)
  }

}
