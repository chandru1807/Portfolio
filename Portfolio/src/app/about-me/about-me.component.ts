import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faFacebook, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faSpinner, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import emailjs from 'emailjs-com';

@Component({
  selector: 'about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements AfterViewInit {
  brandIcons = {
    'gitHub': faGithub,
    'linkedIn': faLinkedin,
    'facebook': faFacebook,
    'instagram': faInstagram
  };
  spinner = faSpinner;
  success = faCheckCircle;
  failure = faTimesCircle;
  emailForm = this.fb.group({
    "from_email": [null, [Validators.required, Validators.email]],
    "from_name": [null, Validators.required],
    "message_html": [null, Validators.required]
  });
  triedToSubmit: boolean = false;
  errMsg: string = null;
  isLoading = null;
  constructor(public fb: FormBuilder) { }

  ngAfterViewInit(): void {
    let svgTextDelay = 0;
    setTimeout(() => {
      let wrappers = document.querySelectorAll(".link-wrapper");
      wrappers.forEach(wrap => {
        let el = wrap as HTMLElement;

        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
        el.style.transition = `all 0.5s ease ${svgTextDelay}s`;
        svgTextDelay += 0.1;
      });
    }, 0);
  }

  get getFromNameControl() {
    return this.emailForm.controls['from_name'];
  }
  get getFromEmailControl() {
    return this.emailForm.controls['from_email'];
  }
  get getMessageControl() {
    return this.emailForm.controls['message_html'];
  }
  sendMail() {
    console.log(this.emailForm);
    this.errMsg = null;
    this.triedToSubmit = true;
    console.log(this.emailForm.value);
    
    if (this.emailForm.valid) {
      this.isLoading = 'spinner';
      emailjs.send('portfolio', 'template_8hHhkgI6', this.emailForm.value, 'user_OaqzY6qM5ZQ2jbG39lNGE').then(result => {
        console.log('success', result.text);
        this.errMsg = null;
        this.isLoading = 'success';
        this.triedToSubmit = false;
        setTimeout(() => {
          this.isLoading = null;
        }, 2000);
        this.emailForm.reset();

      }).catch(err => {
        console.log(err);
        this.isLoading = 'failure';
        setTimeout(() => {
          this.isLoading = null;
        }, 2000);
        this.errMsg = 'Uh oh! Some error occurred. Try below options to contact.'
      });
    }
    else {
      if (this.getFromEmailControl.errors['email']) {
        this.errMsg = 'Please provide a valid email Id.'
      }
      else {
        this.errMsg = 'Please provide all the required inputs.'
      }
    }

  }

}
