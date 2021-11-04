import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  saved: Registro[] = [];

  constructor() { }

  saveRegister( format: string, text: string ) {

    const newRegister = new Registro( format, text );
    this.saved.unshift( newRegister );
  }
}
