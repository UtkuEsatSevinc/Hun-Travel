import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BiletService } from '../../bilet-service/bilet.service';
declare let alertify: any;

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css',
})
export class SignUpPageComponent {
  registerInfo: any = {
    name: '',
    surname: '',
    email: '',
    password: '',
    phoneNumber: '',
    tc: '',
    gender: '',
    role: 'USER',
  };
  response: any;

  constructor(private router: Router, private biletService: BiletService) {}

  sendPostRequest(): void {
    if (
      this.registerInfo.name.trim() === '' ||
      this.registerInfo.surname.trim() === '' ||
      this.registerInfo.email.trim() === '' ||
      this.registerInfo.password.trim() === '' ||
      this.registerInfo.phoneNumber.trim() === '' ||
      this.registerInfo.tc.trim() === '' ||
      this.registerInfo.gender.trim() === ''
    ) {
      alertify.error('Please fill in all fields.');
    } else {
      this.biletService.register(this.registerInfo).subscribe(
        (response) => {
          if(response) {
            this.response = response;
            this.router.navigate(['/home']);
            alertify.success('Account is created successfully.');
          }
          else {
            alertify.error('There is an error occured while signing up.');
          }
        },
        (error) => {
          alertify.error('There is an error occured while signing up.');
        }
      );
    }
  }

  signUp() {
    this.registerInfo.gender = this.registerInfo.gender.toUpperCase();
    this.sendPostRequest();
  }
}
