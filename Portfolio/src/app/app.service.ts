import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const projectconfigurl = 'assets/jsons/projectconfigs.json'
const githuburl = `https://api.github.com/users/chandru1807/repos`;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  isElementMounted = true;
  gitProjects = new BehaviorSubject<any[]>([]);
  gitProjects$ = this.gitProjects.asObservable();

  constructor(public http: HttpClient) { }

  waitForAnimation() {
    this.isElementMounted = false;
    setTimeout(() => {
      this.isElementMounted = true;
    }, 1500);
  }

  getGitProjects() {
    this.http.get(githuburl).subscribe(projects => {
      let projArr = projects as Array<any>;
      console.log(projects);

      this.gitProjects.next(projArr);
    });


  }

  getProjectConfigs() {
    return this.http.get(projectconfigurl);
  }
}
