import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'skills-projects',
  templateUrl: './skills-projects.component.html',
  styleUrls: ['./skills-projects.component.css']
})
export class SkillsProjectsComponent implements OnInit {

  public skills = [
    {
      'skill': 'Angular',
      'profiency': 90
    },
    {
      'skill': 'Java',
      'profiency': 80
    },
    {
      'skill': 'Javascript/Typescript',
      'profiency': 70
    },
    {
      'skill': 'Spring Framework',
      'profiency': 70
    }, {
      'skill': 'Python',
      'profiency': 50
    },
    {
      'skill': 'Sql',
      'profiency': 50
    },
    {
      'skill': 'Flutter',
      'profiency': 80
    }, {
      'skill': 'Dart',
      'profiency': 70
    }, {
      'skill': 'Hibernate',
      'profiency': 80
    },
    {
      'skill': 'HTML',
      'profiency': 70
    },
    {
      'skill': 'CSS',
      'profiency': 70
    },
  ];
  public repos;
  constructor(public http: HttpClient) { }

  ngOnInit() {
    let url = `https://api.github.com/users/chandru1807/repos`;

    setTimeout(() => {
      let svgTextDelay = 1;
      let wrappers = document.querySelectorAll(".capability-text-wrapper");
      wrappers.forEach(wrap => {
        let el = wrap as HTMLElement;

        el.style.opacity = '1';
        el.style.transition = `opacity 1s ease ${svgTextDelay}s`;
        svgTextDelay+=0.2; 
      });

      let delay = 0.75;
    for(let s of this.skills){
      let skill = document.getElementById(s.skill);
      skill.style.width = s.profiency+'%';
      skill.style.transition = 'width 1s cubic-bezier(0.5, -0.55, 0.6, 1.5) '+delay+'s'
      delay += 0.02;
    }
    }, 0);
  }

}
