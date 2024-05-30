import { Component, OnInit } from '@angular/core';
import { BiletService } from '../../bilet-service/bilet.service';
import e from 'express';
declare let alertify: any;

interface Driver {
  tcno: number;
  name: string;
  licenseNumber: string;
}

interface Travel {
  id: number;
  from: string;
  to: string;
  date: string;
  driverTcno?: number;
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})

export class AdminPageComponent implements OnInit {
  currentPage: string = 'addDriver';

  driverInfo: any = {
    name: '',
    surname: '',
    password: '',
    email: '',
    phoneNumber: '',
    tc: '',
    licence: '',
    gender: '',
    role: 'DRIVER',
  };

  travelInfo: any = {
    departure: '',
    destination: '',
    departureDate: '',
    departureTime: '09:00',
    destinationDate: '',
    destinationTime: '09:00',
    licencePlate: '',
    price: 0,
  };

  travelList: any[] = [];
  driverList: any[] = [];

  selectedDriver: string = '';

  constructor(private biletService: BiletService) {}

  sendDriverInfo(): void {
    if (
      this.driverInfo.name.trim() === '' ||
      this.driverInfo.surname.trim() === '' ||
      this.driverInfo.email.trim() === '' ||
      this.driverInfo.password.trim() === '' ||
      this.driverInfo.phoneNumber.trim() === '' ||
      this.driverInfo.tc.trim() === '' ||
      this.driverInfo.gender.trim() === '' ||
      this.driverInfo.licence.trim() === ''
    ) {
      alertify.error('Please fill in all fields.');
    }
    else {
      this.biletService.addDriver(this.driverInfo).subscribe(
        (response) => {
          if(response) {
            alertify.success('Driver is added successfully!');
            this.driverInfo = {
              name: '',
              surname: '',
              password: '',
              email: '',
              phoneNumber: '',
              tc: '',
              licence: '',
              gender: '',
              role: 'DRIVER',
            };
          }else {
            alertify.error('Driver is not addded successfully!');
          }
          
        },
        () => {
          alertify.error('Driver is not addded successfully!');
        }
      );
    }
    
  }

  sendTravelInfo(): void {
    if (
      this.travelInfo.departure.trim() === '' ||
      this.travelInfo.destination.trim() === '' ||
      this.travelInfo.departureDate.trim() === '' ||
      this.travelInfo.departureTime.trim() === '' ||
      this.travelInfo.destinationTime.trim() === '' ||
      this.travelInfo.licencePlate.trim() === '' ||
      this.travelInfo.price === 0
    ) {
      alertify.error('Please fill in all fields.');
    }
    else {
      this.travelInfo.price = parseInt(this.travelInfo.price)
      // this.travelInfo.departureTime += ":00";
      // this.travelInfo.destinationTime += ":00";
      this.biletService.addTravel(this.travelInfo).subscribe(
        (response) => {
          if(response) {
            alertify.success('Travel is added successfully!');
            // this.travelInfo = {
            //   departure: 'İstanbul',
            //   destination: 'İstanbul',
            //   departureDate: '',
            //   departureTime: '09:00:00',
            //   destinationDate: '',
            //   destinationTime: '09:00:00',
            //   licencePlate: '',
            //   price: 0,
            // };
          }
          else {
            alertify.error('Travel is not added successfully!');
          }
        },
        (error) => {
          alertify.error('Travel is not added successfully!');
        }
      );
    }
    
  }

  getTravelList(): void {
    this.biletService.getTravelList().subscribe(
      (response) => {
        this.travelList = response
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  deleteTravel(travelId: string): void {
    this.biletService.deleteTravel(travelId).subscribe(
      (response) => {
        this.getTravelList();
        alertify.success('Travel is deleted successfully!');
      },
      (error) => {
        alertify.error('Travel is not deleted successfully!');
      }
    );
  }

  getDriverList(): void {
    this.biletService.getDriverList().subscribe(
      (response) => {
        this.driverList = response
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  deleteDriver(driverId: string): void {
    this.biletService.deleteDriver(driverId).subscribe(
      (response) => {
        if(response) {
          this.getDriverList();
          alertify.success('Driver is deleted successfully!');
        }
        else {
          alertify.error('Driver is not deleted successfully because driver has assigned to travel.');
        }
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  assignDriver(driverId: string, travelId: string): void {
    this.biletService.assignDriver(driverId, travelId).subscribe(
      (response) => {
        this.getTravelList();
        this.getDriverList();
        alertify.success('Travel - Driver Assignment is successfull');
      },
      (error) => {
        alertify.error('Travel - Driver Assignment is not successfull');
      }
    );
  }

  onSelectDepartureCity(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.travelInfo.departure = selectElement.value;
  }

  onSelectArrivalCity(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.travelInfo.destination = selectElement.value;
  }

  onDepartureTime(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.travelInfo.departureTime = inputElement.value;
  }

  onArrivalTime(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.travelInfo.destinationTime = inputElement.value;
  }

  onDepartureDate(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.travelInfo.departureDate = inputElement.value;
  }

  addDriver() {
    this.currentPage = 'addDriver';
  }

  addTravel() {
    this.currentPage = 'addTravel';
  }

  dropDriver() {
    this.getDriverList();
    this.currentPage = 'dropDriver';
  }

  dropTravel() {
    this.getTravelList();
    this.currentPage = 'dropTravel';
  }

  driverTravel() {
    this.getDriverList();
    this.getTravelList();
    this.currentPage = 'driverTravel';
  }

  ngOnInit(): void {
    const form = document.getElementById('dateForm') as HTMLFormElement;
    const datetimeInput = document.getElementById(
      'datetime'
    ) as HTMLInputElement;
    const messageParagraph = document.getElementById(
      'message'
    ) as HTMLParagraphElement;

    
  }

  addCity(): void {
    const newCityInput = document.getElementById('newCity') as HTMLInputElement;
    const newCityName = newCityInput.value.trim();

    if (newCityName) {
      const departureSelect = document.getElementById(
        'departureCity'
      ) as HTMLSelectElement;
      const arrivalSelect = document.getElementById(
        'arrivalCity'
      ) as HTMLSelectElement;

      // Kalkış şehirlerine yeni şehir eklemek
      let newOption = new Option(newCityName, newCityName);
      departureSelect.options.add(newOption);

      // Varış şehirlerine yeni şehir eklemek
      newOption = new Option(newCityName, newCityName);
      arrivalSelect.options.add(newOption);

      // Ekleme yapıldıktan sonra input alanını temizle
      newCityInput.value = '';
    } else {
      alert('Lütfen geçerli bir şehir adı giriniz.');
    }
  }

  selectedDriverTcno!: number;

  assignsDriver(travelId: number): void {
    const travel = this.travels.find((travel) => travel.id === travelId);
    if (travel) {
      travel.driverTcno = this.selectedDriverTcno;
    }
  }

  getDriverName(tcno: number | undefined): string | undefined {
    return this.drivers.find((driver) => driver.tcno === tcno)?.name;
  }

  eslesme() {
    alertify.success('Travel - Driver Assignment is success');
  }

  travels: Travel[] = [
    { id: 1, from: 'Karabük', to: 'İzmir', date: '2024-05-21 Time: 14:30' },
    { id: 2, from: 'İstanbul', to: 'Bursa', date: '2024-05-22 Time: 10:15' },
    { id: 3, from: 'Antalya', to: 'Konya', date: '2024-05-23 Time: 23:50' },
  ];

  onDeleteTravel(id: number): void {
    this.travels = this.travels.filter((travel) => travel.id !== id);
  }

  drivers: Driver[] = [
    { tcno: 12345678901, name: 'Ahmet Yılmaz', licenseNumber: 'ABC123' },
    { tcno: 23456789012, name: 'Mehmet Özcan', licenseNumber: 'XYZ789' },
    { tcno: 34567890123, name: 'Elif Toprak', licenseNumber: 'DEF456' },
  ];

  onDeleteDriver(tcno: number): void {
    this.drivers = this.drivers.filter((driver) => driver.tcno !== tcno);
  }
}
