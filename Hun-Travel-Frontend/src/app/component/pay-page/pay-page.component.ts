import { Component, OnInit } from '@angular/core';
import { BiletService } from '../../bilet-service/bilet.service';
declare let alertify: any;
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrl: './pay-page.component.css',
})
export class PayPageComponent implements OnInit {
  payInformation: any = {
    name: '',
    surname: '',
    country: '',
    city: '',
    address: '',
    zipCode: '',
    mail: '',
    phoneNumber: '',
    cardHolderName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: '',
    paymentMethod: 'Advance',
  };

  isAccepted: boolean = false;

  name: string = '';
  surname: string = '';
  mail: string = '';
  address: string = '';
  phoneNumber: string = '';
  city: string = '';
  zipCode: string = '';
  nameOnCard: string = '';
  cardNumber: string = '';
  expMonth: string = '';
  expYear: string = '';
  cvv: string = '';
  accept: boolean = false;
  country: string = '';
  payMethod: string = '';

  years: number[] = [];
  months: number[] = [];

  seatId: any;
  travelInformation: any;

  constructor(private router: Router, private biletService: BiletService) {}

  payTicketHandler(): void {
    this.payInformation.cvv = this.payInformation.cvv.toString();
    this.payInformation.zipCode = this.payInformation.zipCode.toString();
    this.payInformation.paymentMethod = this.payInformation.paymentMethod.toUpperCase();
    if (
      this.payInformation.name.trim() === '' ||
      this.payInformation.surname.trim() === '' ||
      this.payInformation.mail.trim() === '' ||
      this.payInformation.address.trim() === '' ||
      this.payInformation.phoneNumber.trim() === '' ||
      this.payInformation.city.trim() === '' ||
      this.payInformation.zipCode.trim() === '' ||
      this.payInformation.cardHolderName.trim() === '' ||
      this.payInformation.cardNumber.trim() === '' ||
      this.payInformation.expMonth.trim() === '' ||
      this.payInformation.expYear.trim() === '' ||
      this.payInformation.cvv.trim() === '' ||
      this.payInformation.country.trim() === '' ||
      this.payInformation.paymentMethod.trim() === ''
    ) {
      alertify.error('Please fill in all fields..');
    } else {
      if(this.isAccepted) {
        this.biletService.payTicket(this.payInformation, this.seatId).subscribe(
          (response) => {
            if(response) {
              alertify.success('Payment is successfull');
              this.router.navigate(['/customer-profile']);
            }
            else {
              alertify.error('Payment is not successfull');
            }
          },
          (error) => {
            alertify.error('Payment is not successfull');
          }
        );
      }
      else {
        alertify.error('You must declare to have read Privacy Policy and agree to T&C and T&C of Carriage');
      }
      
      
    }
    
  }

  onCardNumberInput() {
    this.payInformation.cardNumber = this.formatCardNumber(this.payInformation.cardNumber);
  }

  formatCardNumber(value: string): string {
    let cleanValue = value.replace(/\s+/g, '');

    if (cleanValue.length > 16) {
      cleanValue = cleanValue.substring(0, 16);
    }

    let formattedValue = cleanValue.match(/.{1,4}/g)?.join(' ') || '';

    return formattedValue;
  }

  ngOnInit(): void {
    const startYear = 2024;
    const startMonth = 0;

    for (let i = 0; i < 10; i++) {
      this.years.push(startYear + i);
    }
    for (let i = 1; i < 13; i++) {
      this.months.push(startMonth + i);
    }

    this.biletService.travelInformation.subscribe((data) => {
      this.seatId = data.seatId;
      this.travelInformation = data.travel;
    });
  }

  payTickett() {
    if (
      this.name.trim() === '' ||
      this.surname.trim() === '' ||
      this.mail.trim() === '' ||
      this.address.trim() === '' ||
      this.phoneNumber.trim() === '' ||
      this.city.trim() === '' ||
      this.zipCode.trim() === '' ||
      this.nameOnCard.trim() === '' ||
      this.cardNumber.trim() === '' ||
      this.expMonth.trim() === '' ||
      this.expYear.trim() === '' ||
      this.cvv.trim() === '' ||
      this.country.trim() === '' ||
      this.payMethod.trim() === ''
    ) {
      alertify.error('Please fill in all fields..');
    } else {
      alertify.success('Payment is success');
    }
  }
}
