import { Component, OnInit } from '@angular/core';
import { BiletService } from '../../bilet-service/bilet.service';

export interface Sefer {
  id: number;
  name: string;
  kalkis: string;
  varis: string;
  kalkisSaat: string;
  seferSaat: string;
  price: number;
  description: string;
  image: string;
}

interface Passenger {
  name: string;
  boardingPoint: string;
  dropPoint: string;
}

interface Trip {
  tripId: string;
  departure: string;
  departureTime: string;
  arrival: string;
  arrivalTime: string;
  busLicensePlate: string;
  driverName: string;
  routeDetails: string;
  stops: string[];
  emergencyContacts: { description: string; phone: string }[];
  passengers: Passenger[];
}
interface Travel {
  id: number;
  from: string;
  to: string;
  date: string;
}

@Component({
  selector: 'app-driver-page',
  templateUrl: './driver-page.component.html',
  styleUrls: ['./driver-page.component.css'],
})
export class DriverPageComponent implements OnInit {
  currentPage: string = 'Seferlerim';

  travelList: any;
  driverTravel: any;
  driverId: any;
  userList: any;
  driverInformation: any
  tripDeparture: any
  tripDestination: any

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

  getDriverTravel(): void {
    this.driverId = localStorage.getItem("userId")
    this.biletService.getDrivelTravels(this.driverId).subscribe(
      (response) => {
        this.driverTravel = response
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  getDriverInfo(): void {
    this.biletService.getUserInformation().subscribe(
      (response) => {
        this.driverInformation = response
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  travels: Travel[] = [
    { id: 1, from: 'Ankara', to: 'İstanbul', date: '2024-05-21 Time: 14:30' },
    { id: 2, from: 'İzmir', to: 'Bursa', date: '2024-05-22 Time: 10:15' },
    { id: 3, from: 'Antalya', to: 'Konya', date: '2024-05-23 Time: 23:50' },
  ];

  trip: Trip = {
    tripId: 'IST-ANK123',
    departure: 'İstanbul',
    departureTime: '08:00',
    arrival: 'Ankara',
    arrivalTime: '14:00',
    busLicensePlate: '34 XYZ 98',
    driverName: 'Ahmet Yılmaz',
    routeDetails:
      'Yol güzergahı İstanbul’dan başlayıp, Bolu ve Gerede üzerinden Ankara’ya ulaşır.',
    stops: ['Bolu', 'Gerede'],
    emergencyContacts: [
      { description: 'Yardım', phone: '1234567890' },
      { description: 'Acil', phone: '0987654321' },
    ],
    passengers: [
      { name: 'Mehmet Kaya', boardingPoint: 'İstanbul', dropPoint: 'Bolu' },
      { name: 'Leyla Baran', boardingPoint: 'İstanbul', dropPoint: 'Ankara' },
    ],
  };

  constructor(private biletService: BiletService) {}

  ngOnInit(): void {
    this.getTravelList();
    this.getDriverTravel();
    this.getDriverInfo();
  }

  bilet = [
    [
      {
        id: 1,
        name: 'İstanbul-Eskişehir',
        kalkis: 'İstanbul',
        varis: 'Eskişehir',
        kalkisSaat: '10:00',
        price: 750,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '17:00',
      },
      {
        id: 2,
        name: 'Eskişehir-İstanbul',
        kalkis: 'Eskişehir',
        varis: 'İstanbul',
        kalkisSaat: '13:00',
        price: 750,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '20:00',
      },
      {
        id: 3,
        name: 'İstanbul-Ankara',
        kalkis: 'İstanbul',
        varis: 'Ankara',
        kalkisSaat: '09:00',
        price: 500,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '14:30',
      },
    ],
  ];

  
  Seferlerim() {
    this.currentPage = 'Seferlerim';
  }

  Seferler() {
    this.currentPage = 'Seferler';
  }
}
