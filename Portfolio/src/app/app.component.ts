import { Component, HostListener } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private bullets = {
    '0':'',
    '1':'',
    '2':'',
    '3':''
  }
  private currentIndex = 0;

  constructor(private appService: AppService) { }

 
  @HostListener('mousewheel', ['$event']) getScrollHeight(event) {
   
    if(this.appService.isElementMounted){
      if(this.currentIndex < 3 && event.deltaY > 0){
        
        this.currentIndex = this.currentIndex + 1;
        this.appService.waitForAnimation();
      }
      else if(this.currentIndex > 0 && event.deltaY < 0){
        
        this.currentIndex = this.currentIndex - 1;
        this.appService.waitForAnimation();
      }
    }
 }

 checkifActive(key:string): boolean{

  if(this.currentIndex === +key){
    return true;
  }
  else{
    return false;
  }
 }

 onBulletClicked(key:string){
   this.currentIndex = +key;
   this.appService.waitForAnimation();
 }
}
