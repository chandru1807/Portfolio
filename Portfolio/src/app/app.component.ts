import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  private bullets = {
    '0':'',
    '1':'',
    '2':'',
    '3':''
  }
  private currentIndex = 0;

  constructor(private appService: AppService) { }
  ngAfterViewInit(): void {
    
 
// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;
 
let startTouch = (e) => {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
};
 
let moveTouch = (e) => {
  if (initialX === null) {
    return;
  }
 
  if (initialY === null) {
    return;
  }
 
  var currentX = e.touches[0].clientX;
  var currentY = e.touches[0].clientY;
 
  var diffX = initialX - currentX;
  var diffY = initialY - currentY;
 
  if (Math.abs(diffX) > Math.abs(diffY)) {
    // sliding horizontally
    if (diffX > 0) {
      // swiped left
      console.log("swiped left");
    } else {
      // swiped right
      console.log("swiped right");
    }  
  } else {
    // sliding vertically
    if (diffY > 0) {
      // swiped up
      console.log("swiped up");
     
      if(this.appService.isElementMounted){
        if(this.currentIndex < 3){
          
          this.currentIndex = this.currentIndex + 1;
          this.appService.waitForAnimation();
        }
      }
    } else {
      // swiped down
      if(this.appService.isElementMounted){
        if(this.currentIndex > 0){
          
          this.currentIndex = this.currentIndex - 1;
          this.appService.waitForAnimation();
        }
      }
      console.log("swiped down");
    }  
  }
 
  initialX = null;
  initialY = null;
   
  //e.preventDefault();
};
window.addEventListener("touchstart", startTouch, false);
    window.addEventListener("touchmove", moveTouch, false);
  }

 
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

//  @HostListener('document:touchmove', ['$event']) onTouchMove($event: TouchEvent): void 
//  { if (this.isPanning && this.panningEnabled) { 
//    const clientX = $event.changedTouches[0].clientX; 
//   const clientY = $event.changedTouches[0].clientY; 
//   const movementX = clientX - this._touchLastX; const movementY = clientY - this._touchLastY; 
//   this._touchLastX = clientX; this._touchLastY = clientY; this.pan(movementX, movementY); } 
// }


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
