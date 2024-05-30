import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BiletService } from '../../bilet-service/bilet.service';
declare let alertify: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginInfo: any = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private biletService: BiletService) {}

  sendLoginInfo(): void {
    this.biletService.login(this.loginInfo).subscribe(
      (response) => {
        if(response) {
          alertify.success('Login is successfull!');
          if (response.role === 'USER') {
            this.router.navigate(['/anasayfa']);
          } else if (response.role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else if (response.role === 'DRIVER') {
            this.router.navigate(['/driver']);
          }
        }
        else {
          alertify.error('Invalid credentials!');
        }
      },
      (error) => {
        alertify.error('Invalid credentials!');
      }
    );
  }

  login() {
    if (
      this.loginInfo.email.trim() === '' ||
      this.loginInfo.password.trim() === ''
    ) {
      alertify.error('Please fill in both email and password fields.');
    } else {
      this.sendLoginInfo();
      // this.biletService.getUserInformation();
    }
  }
}
