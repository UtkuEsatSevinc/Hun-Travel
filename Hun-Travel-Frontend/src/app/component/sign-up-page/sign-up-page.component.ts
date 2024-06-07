import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BiletService } from '../../bilet-service/bilet.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare let alertify: any;

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css',
})
export class SignUpPageComponent{
tcValidator = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(11), Validators.maxLength(11)]);
phoneValidator = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(11), Validators.maxLength(11)]);
  emailValidator = new FormControl('', [Validators.required, Validators.email]);
  registerForm!: FormGroup ;

  errorMessage = "";
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
  
  constructor(private router: Router, private biletService: BiletService,private formBuilder: FormBuilder) {
     

  }
  
 
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
    
      if(!this.tcInputInvalid() || ! this.phoneInputInvalid() || !this.emailInputInvalid()) {
        this.registerInfo.gender = this.registerInfo.gender.toUpperCase();
        this.sendPostRequest();
      } else {
        this.errorMessage = "Please enter a valid input."
      }
  }

  tcInputInvalid() {
    return this.tcValidator.hasError('pattern') || this.tcValidator.hasError('minlength') || this.tcValidator.hasError('maxlength');
  }
  phoneInputInvalid() {
    return this.phoneValidator.hasError('pattern') || this.phoneValidator.hasError('minlength') || this.phoneValidator.hasError('maxlength');
  }

  emailInputInvalid() {
    return this.emailValidator.hasError('email');
  }
}
