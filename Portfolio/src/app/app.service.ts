import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  isElementMounted = true;

  constructor() { }

  waitForAnimation(){
    this.isElementMounted = false;
    setTimeout(() => {
      this.isElementMounted = true;
    }, 1500);
  }
}
