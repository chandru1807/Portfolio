import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

const filterCss = {
  'All': {
    "left": '0%',
    "right": '75%'
  },
  'Angular': {
    "left": '25%',
    "right": '50%'
  },
  'Flutter': {
    "left": '50%',
    "right": '25%'
  },
  'React': {
    "left": '75%',
    "right": '0%'
  }
};

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects;
  projectconfigs;
  origprojectconfigs;
  constructor(public http: HttpClient, public appService: AppService) { }

  ngOnInit(): void {
    this.appService.getProjectConfigs().subscribe(configs => {
      this.projectconfigs = configs['gitProjects'];
      this.origprojectconfigs = JSON.parse(JSON.stringify(configs['gitProjects']))
      this.appService.gitProjects$.subscribe(projects => {

        this.projects = projects;
        setTimeout(() => {
          let elements = document.querySelectorAll('.proj-cards');
          let delay = 0.5;
          elements.forEach((el, i) => {
            let e = el as HTMLElement;
            e.style.animation = `proj-cards-animation 1s forwards cubic-bezier(0.5, -0.55, 0.6, 1.5) ${delay}s`
            delay += 0.1
          })
        }, 0);
      });
    });


  }


  showSheet(elId) {
    let el = document.getElementById(elId);
    el.style.height = '100%'
    el.style.opacity = '1'
  }

  hideSheet(elId) {
    let el = document.getElementById(elId);
    el.style.height = '0'
    el.style.opacity = '0'
  }

  getImgUrl(name) {
    return (this.projectconfigs[name] && this.projectconfigs[name].img) ? `url(${this.projectconfigs[name].img})` : `url(${this.projectconfigs['backupImgUrl']})`
  }

  handleFilter(filterEl) {
    let filterBack = document.getElementById('filterBack');
    let css = filterCss[filterEl];
    filterBack.style.left = css['left'];
    filterBack.style.right = css['right'];
    let workObj = JSON.parse(JSON.stringify(this.origprojectconfigs))
    this.projectconfigs = {}
    setTimeout(() => {
      let filteredObj = {
        'backupImgUrl': workObj['backupImgUrl']
      };
      if (filterEl === 'All') {
        this.projectconfigs = { ...workObj }
      }
      else {
        for (let key in workObj) {
          if (key !== 'backupImgUrl' && workObj[key]['techStack'].includes(filterEl)) {
            filteredObj[key] = workObj[key];
          }
        }
        this.projectconfigs = { ...filteredObj };
      }

      this.projects = [...this.projects]
    }, 0);
    setTimeout(() => {
      let elements = document.querySelectorAll('.proj-cards');
      let delay = 0.5;
      elements.forEach((el, i) => {
        let e = el as HTMLElement;
        e.style.animation = `proj-cards-animation 1s forwards cubic-bezier(0.5, -0.55, 0.6, 1.5) ${delay}s`
        delay += 0.1
      })
    }, 0);
  }

}
