import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent  {
  private gitRepos;
  // private cardImageObj = {
  //   "css":"card-img-left",
  //   "url":"../../assets/images/IMG-20180429-WA0001-01.jpeg"
  // }
  constructor(private appService: AppService) { }


  



}
