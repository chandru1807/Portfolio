import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'skills-projects',
  templateUrl: './skills-projects.component.html',
  styleUrls: ['./skills-projects.component.css']
})
export class SkillsProjectsComponent implements OnInit {

  private skills = [
    {'skill':'Angular',
    'profiency':80
    },
    {'skill':'Java',
    'profiency':80
    },
    {'skill':'Typescript',
    'profiency':70
    },
    {'skill':'Spring',
    'profiency':70
    },{'skill':'Python',
    'profiency':50
    },
    {'skill':'Sql',
    'profiency':50
    },
    {'skill':'Flutter',
    'profiency':70
    },{'skill':'Dart',
    'profiency':70
    },{'skill':'Hibernate',
    'profiency':70
    }
  ];
  private repos;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    let url = `https://api.github.com/users/chandru1807/repos`;
    this.http.get(url).subscribe(repos => {
      let delay = 0;
      for(let s of this.skills){
        let skill = document.getElementById(s.skill);
        skill.style.width = s.profiency+'%';
        skill.style.transition = 'width 1s ease '+delay+'s'
        delay += 0.1;
      }
      console.log(repos);
      this.repos = repos;
      setTimeout(() => {
        delay = 0;
        for(let repo of this.repos){
          let r = document.getElementById(repo.id);
          r.style.opacity = '1';
          r.style.transition = 'opacity 2s ease '+delay+'s'
          delay += 0.1;
        }
      }, 0);
    })
  }

  routeIt(url){
    window.open(url, '_blank');
  }

}
