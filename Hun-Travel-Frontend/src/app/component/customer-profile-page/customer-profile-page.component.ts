import { Component } from '@angular/core';
import { BiletService } from '../../bilet-service/bilet.service';
import { Router } from '@angular/router';
declare let alertify: any;

@Component({
  selector: 'app-customer-profile-page',
  templateUrl: './customer-profile-page.component.html',
  styleUrl: './customer-profile-page.component.css',
})
export class CustomerProfilePageComponent {
  currentPage: string = 'ticket';
  userInfo: any = {};
  purchasedTickets: any = {};
  updatedInfo: any = {
    id: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    phoneNumber: '',
    tc: '',
    gender: '',
    role: 'USER',
    licence: '',
  };

  constructor(private router: Router, private biletService: BiletService) {}

  ngOnInit(): void {
    this.getPurchasedTicket();
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.biletService.getUserInformation().subscribe(
      (response) => {
        this.userInfo = response;
        this.updatedInfo.gender = response.gender;
        this.updatedInfo.id = response.id;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }
  
  getPurchasedTicket(): void {
    this.biletService.getPurchasedTicket().subscribe(
      (response) => {
        this.purchasedTickets = response;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  deleteAccount(): void {
    this.biletService.deleteUserAccount().subscribe(
      (response) => {
        alertify.success('Your account is deleted successfully!');
        this.router.navigate(['/home']);
      },
      (error) => {        
        alertify.error('Delete is not successfull because you have ticket.');
      }
    );
  }

  updateUser(): void {
    this.biletService.updateUserInfo(this.updatedInfo).subscribe(
      (response) => {
        alertify.success('Your information is updated successfully!');
      },
      (error) => {
        alertify.error('Error.');
      }
    );
  }

  information() {
    this.getUserInfo();
    this.currentPage = 'information';
  }

  ticket() {
    this.getPurchasedTicket();
    this.getUserInfo();
    this.currentPage = 'ticket';
  }

  delete() {
    this.currentPage = 'delete';
  }
  change() {
    this.getUserInfo();
    this.currentPage = 'change';
  }
}
