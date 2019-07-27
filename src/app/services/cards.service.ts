import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GLOBAL} from '../config';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private httpClinet: HttpClient) { }
  public getCards(): Observable<Array<any>> {
    return this.httpClinet.get<Array<any>>(`${GLOBAL.URL}/cards`);
  }
}
