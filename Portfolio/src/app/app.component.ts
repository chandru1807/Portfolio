import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  public bullets = {
    '0': 'Landing page',
    '1': 'Skills',
    '2': 'Projects',
    '3': 'Contact me'
  }
  public currentIndex = 0;

  constructor(public appService: AppService) { }
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

          if (this.appService.isElementMounted) {
            if (this.currentIndex < 3) {

              this.currentIndex = this.currentIndex + 1;
              this.appService.waitForAnimation();
            }
          }
        } else {
          // swiped down
          if (this.appService.isElementMounted) {
            if (this.currentIndex > 0) {

              this.currentIndex = this.currentIndex - 1;
              this.appService.waitForAnimation();
            }
          }
          console.log("swiped down");
        }
      }

      initialX = null;
      initialY = null;

      e.preventDefault();
      //e.stopPropagation();
    };
    window.addEventListener("touchstart", startTouch, { passive: false });
    window.addEventListener("touchmove", moveTouch, { passive: false });
  }


  @HostListener('mousewheel', ['$event']) getScrollHeight(event) {

    if (this.appService.isElementMounted) {
      if (this.currentIndex < 3 && event.deltaY > 0) {

        this.currentIndex = this.currentIndex + 1;
        this.appService.waitForAnimation();
      }
      else if (this.currentIndex > 0 && event.deltaY < 0) {

        this.currentIndex = this.currentIndex - 1;
        this.appService.waitForAnimation();
      }
    }
  }

  checkifActive(key: string): boolean {

    if (this.currentIndex === +key) {
      return true;
    }
    else {
      return false;
    }
  }

  onBulletClicked(key: string) {
    this.currentIndex = +key;
    this.appService.waitForAnimation();
  }

  showTooltip(toolId){
    console.log('showing toop');
    let tooltip = document.getElementById(toolId);

    
    tooltip.style.transform = 'scale3d(1,1,1)';
    tooltip.style.opacity = '1';
  }

  hideTooltip(toolId){
    console.log('hide toop');
    let tooltip = document.getElementById(toolId);

    tooltip.style.opacity = '0';
    tooltip.style.transform = 'scale3d(0,0,0)';
  }
}
