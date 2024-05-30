import { Component, OnInit } from '@angular/core';
import { BiletService } from '../../bilet-service/bilet.service';
declare let alertify: any;

@Component({
  selector: 'app-anasayfa-page',
  templateUrl: './anasayfa-page.component.html',
  styleUrl: './anasayfa-page.component.css',
})
export class AnasayfaPageComponent implements OnInit  {
  contactInfo: any = {
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  };

  filterInfo: any = {
    departure: '',
    destination: '',
  }

  isSelected: boolean = false;
  isSelected2: boolean = false;

  constructor(private biletService: BiletService) {}

  ngOnInit(): void {
    this.isSelected = true;
    this.isSelected2 = true;
  }

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

  sendFilter() {
    const data = { data: this.filterInfo };
    this.biletService.changeFilter(data);
  }

  onSelectDeparture(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.filterInfo.departure = selectElement.value;
  }

  onSelectDestination(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.filterInfo.destination = selectElement.value;
  }

  logout() {
    this.biletService.logout();
  }
  
}
