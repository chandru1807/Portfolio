import { Component, OnInit, AfterViewInit } from '@angular/core';
import { faGithub, faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements AfterViewInit {
  brandIcons = {
    'gitHub':faGithub,
    'linkedIn': faLinkedin,
    'facebook':faFacebook,
    'instagram':faInstagram
  };
  constructor() { }

  ngAfterViewInit(): void {
    let svgTextDelay = 0;
   setTimeout(() => {
    let wrappers = document.querySelectorAll(".link-wrapper");
    wrappers.forEach(wrap => {
      let el = wrap as HTMLElement;

      el.style.opacity = '1';
      el.style.transform = 'translateX(0)';
      el.style.transition = `all 0.5s ease ${svgTextDelay}s`;
      svgTextDelay+=0.1; 
    });
   }, 0);
  }

}
