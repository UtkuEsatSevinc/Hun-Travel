import { Component } from '@angular/core';
import { BiletService } from '../../bilet-service/bilet.service';
declare let alertify: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  contactInfo: any = {
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  };

  constructor(private biletService: BiletService) {}

  sendContact(): void {
    if (
      this.contactInfo.name.trim() === '' ||
      this.contactInfo.email.trim() === '' ||
      this.contactInfo.phoneNumber.trim() === '' ||
      this.contactInfo.message.trim() === ''
    ) {
      alertify.error('Please fill in all fields!');
    }
    else {
      this.biletService.contactUs(this.contactInfo).subscribe(
        () => {
          alertify.success('Mail is sent successfully!');
        },
        () => {
          alertify.error('Mail is not sent successfully!');
        }
      );
    }
  }
}
