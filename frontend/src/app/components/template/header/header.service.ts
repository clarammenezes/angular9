import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HeaderData} from "./header-data.model";


@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerData = new BehaviorSubject<HeaderData>({
    title: 'Início',
    icon: 'home',
    routeUrl: ''
  }) // BehaviorSubject is a type of Observable


  constructor() { }

  get headerData(): HeaderData {
    return this._headerData.value
  }
  set headerData(headerData: HeaderData) {
    this._headerData.next(headerData)
  }
}
