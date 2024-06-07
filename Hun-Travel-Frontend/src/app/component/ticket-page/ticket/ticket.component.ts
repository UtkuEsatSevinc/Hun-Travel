import { Component, OnInit } from '@angular/core';
import { Bilet } from './bilet';
import { BiletService } from '../../../bilet-service/bilet.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
declare let alertify: any;

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent implements OnInit {
  currentGun = 0;
  selectedKalkisYeri?: string;
  seferFilterForm!: FormGroup;
  seferFilters?: { kalkisYeri: string; varisYeri: string; seferSaat: string };
  form = new FormGroup({
    kalkisYeri: new FormControl(''), // Initial value set to an empty string
    varisYeri: new FormControl('')
  });
  cities: any[] = [
    'İstanbul',
    'Ankara',
    'İzmir',
    'Antalya',
    'Eskişehir',
    'Samsun',
    'Hatay',
    'Bursa',
    'Sivas',
    'Kars',
    'Edirne',
    'Tekirdağ'
  ]
  filterArray: any = {
    departure: '',
    destination: '',
    search: '',
    date: '',
  };

  biletler: Bilet[][] = [];
  travelList: any[] = [];

  kalkisYerleri: string[] = [];
  varisYerleri: string[] = [];

  isCleared: boolean = false;

  seats: any[] = [];
  travelTicket: any;
  selectedSeatId: any;
  selectedSeatNumber: any;

  userInformation: any[] = [];
  userGender: any;

  sentFilter: any;
  selectedValue:any;
  buttons: boolean[] = Array(31).fill(false);

  dateButtons: any[] = [
    { name: '01/07/2024', date: '2024-07-01' },
    { name: '02/07/2024', date: '2024-07-02' },
    { name: '03/07/2024', date: '2024-07-03' },
    { name: '04/07/2024', date: '2024-07-04' },
    { name: '05/07/2024', date: '2024-07-05' },
    { name: '06/07/2024', date: '2024-07-06' },
  ];

  constructor(
    private router: Router,
    private biletService: BiletService,
    private formBuilder: FormBuilder
  ) {}

  sendData(seatId: any) {
    if (seatId) {
      this.router.navigate(['/pay']);
      alertify.success('Your Ticket Purchase Process Has Started!');
      const data = { seatId: seatId, travel: this.travelTicket };
      this.biletService.changeData(data);
    } else {
      alertify.error('You need to select a seat number to continue!');
    }
  }

  getFilterData() {
    this.biletService.ticketFilter.subscribe((data) => {
      if (data !== null) {
        this.sentFilter = data.data;
        this.filterArray.departure = this.sentFilter.departure;
        this.filterArray.destination = this.sentFilter.destination;
      }
    });
  }

  ngOnInit(): void {
    this.getBiletler();
    this.getUserInformation();
    this.getFilterData();
    this.filterTravel();
    this.seferFilterForm = this.formBuilder.group({
      kalkisYeri: [''],
      varisYeri: [''],
      seferSaat: [''],
    });
  }

  getTravelList(): void {
    this.biletService.getTravelList().subscribe(
      (response) => {
        this.travelList = response;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  getUserInformation(): void {
    this.biletService.getUserInformation().subscribe(
      (response) => {
        this.userInformation = response;
        this.userGender = response.gender;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  filterTravel(): void {
    this.biletService.searchTravel(this.filterArray).subscribe(
      (response) => {
        this.travelList = response;
      },
      (error) => {
        console.error('Error posting data', error);
      }
    );
  }

  getUserTravel(travelId: any, bilet: any): void {
    this.selectedBilet = bilet;
    this.showDetails = true;
    this.biletService
      .getUserTravel(travelId, localStorage.getItem('userId'))
      .subscribe(
        (response) => {
          this.seats = response.seatList;
          this.travelTicket = response;
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
  }

  selectSeatNumber(seatId: any, seatNumber: any) {
    this.selectedSeatId = seatId;
    this.selectedSeatNumber = seatNumber;
    this.buttons.fill(false);
    this.buttons[parseInt(seatNumber) - 1] = true;
  }

  filterDate(date: string) {
    this.filterArray.date = date;
    this.filterTravel();
  }

  clearFilter() {
    this.isCleared = true;
    this.filterArray = {
      departure: '',
      destination: '',
      search: '',
      date: '',
    };
    this.filterTravel();
  }

  onSelectDeparture(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.filterArray.departure = selectElement.value;
    this.selectedValue = selectElement.value;
  }

  onSelectDestination(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.filterArray.destination = selectElement.value;
  }

  getBiletler(): void {
    this.biletler = this.biletService.getSeferler();
    this.biletler.forEach((biletGun) => {
      biletGun.forEach((bilet) => {
        this.kalkisYerleri.push(bilet.kalkis);
        this.varisYerleri.push(bilet.varis);
      });
    });

    // Remove duplicate elements
    this.kalkisYerleri = [...new Set(this.kalkisYerleri)];
    this.varisYerleri = [...new Set(this.varisYerleri)];
  }

  onFormSubmit() {
    if (this.seferFilterForm.valid) {
      const formValues = this.seferFilterForm.value;
      this.seferFilters = formValues;
    } else {
      alertify.error('The requested travel is not available');
    }
  }

  title = 'Search Ticket';
  title1 = 'Ticket List';
  title2 = 'Ticket Detail';
  filterText = '';
  showDetails: boolean = false;

  addToCart() {
    alertify.success('Your Ticket Purchase Process Has Started');
  }

  selectedBilet: any;

  toggleDetails(bilet: any) {
    this.selectedBilet = bilet;
    this.showDetails = true;
  }
}
