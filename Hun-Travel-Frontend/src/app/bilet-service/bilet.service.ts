import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

@Injectable({
  providedIn: 'root',
})
export class BiletService {
  private registerUrl = 'http://localhost:8080/auth/register';
  private loginUrl = 'http://localhost:8080/auth/login';
  private userInfoUrl = `http://localhost:8080/user/info`;
  private deleteUserUrl = `http://localhost:8080/user/delete`;
  private updateUserUrl = 'http://localhost:8080/user/update';
  private addDriverUrl = 'http://localhost:8080/admin/add/driver';
  private addTravelUrl = 'http://localhost:8080/admin/add/travel';
  private travelListUrl = 'http://localhost:8080/admin/list/travel';
  private deleteTravelUrl = 'http://localhost:8080/admin/drop/travel';
  private driverListUrl = 'http://localhost:8080/admin/list/driver';
  private deleteDriverUrl = 'http://localhost:8080/admin/drop/driver';
  private assignDriverUrl = 'http://localhost:8080/admin/assign/driver';
  private searchTravelUrl = 'http://localhost:8080/user/search/travel';
  private userTravelUrl = 'http://localhost:8080/user/get/travel';
  private payTicketUrl = 'http://localhost:8080/user/pay';
  private getPurchasedTicketUrl = 'http://localhost:8080/user/get/purchasedTickets';
  private driverTravelUrl = 'http://localhost:8080/driver/get/travels';
  private contactUsUrl = 'http://localhost:8080/contact/add';
  private contactUsListUrl = 'http://localhost:8080/contact/list';


  private dataSubject = new BehaviorSubject<any>(null);
  travelInformation = this.dataSubject.asObservable();

  private ticketFilterData = new BehaviorSubject<any>(null);
  ticketFilter = this.ticketFilterData.asObservable();

  constructor(private http: HttpClient) {}

  changeData(data: any) {
    this.dataSubject.next(data);
  }

  changeFilter(data: any) {
    this.ticketFilterData.next(data);
  }

  getSeferler(): any[] {
    return this.seferler;
  }

  // getData(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }

  register(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.registerUrl, data, { headers });
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials).pipe(
      tap((response) => {
        localStorage.setItem('userId', response.id);
      })
    );
  }

  // getUserInformation(): string | null {
  //   return localStorage.getItem('userId');
  // }

  logout(): void {
    localStorage.removeItem('userId');
  }

  getUserInformation(): Observable<any> {
    return this.http.get<any>(
      this.userInfoUrl + '?userId=' + localStorage.getItem('userId')
    );
  }

  deleteUserAccount(): Observable<any> {
    return this.http.get<any>(
      this.deleteUserUrl + '?userId=' + localStorage.getItem('userId')
    );
  }

  updateUserInfo(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.updateUserUrl, data, { headers });
  }

  addDriver(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.addDriverUrl, data, { headers });
  }

  addTravel(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.addTravelUrl, data, { headers });
  }

  getTravelList(): Observable<any> {
    return this.http.get<any>(this.travelListUrl);
  }

  deleteTravel(travelId: string): Observable<any> {
    return this.http.get<any>(this.deleteTravelUrl + '?travelId=' + travelId);
  }

  getDriverList(): Observable<any> {
    return this.http.get<any>(this.driverListUrl);
  }

  deleteDriver(driverId: string): Observable<any> {
    return this.http.get<any>(this.deleteDriverUrl + '?driverId=' + driverId);
  }

  assignDriver(driverId: string, travelId: string): Observable<any> {
    return this.http.get<any>(
      this.assignDriverUrl + '?travelId=' + travelId + '&driverId=' + driverId
    );
  }

  searchTravel(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.searchTravelUrl, data, { headers });
  }

  getUserTravel(travelId: string, userId: any): Observable<any> {
    return this.http.get<any>(
      this.userTravelUrl + '?travelId=' + travelId + '&userId=' + userId
    );
  }

  payTicket(data: any, seatId: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      this.payTicketUrl +
        '?userId=' +
        localStorage.getItem('userId') +
        '&seatId=' +
        seatId,
      data,
      { headers }
    );
  }

  getPurchasedTicket(): Observable<any> {
    return this.http.get<any>(
      this.getPurchasedTicketUrl + '?userId=' + localStorage.getItem('userId')
    );
  }

  getDrivelTravels(driverId: any): Observable<any> {
    return this.http.get<any>(this.driverTravelUrl + "?driverId=" + driverId);
  }

  contactUs(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.contactUsUrl, data, { headers });
  }

  getContactMessageList(): Observable<any> {
    return this.http.get<any>(this.contactUsListUrl);
  }

  private seferler: Sefer[][] = [
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
      {
        id: 4,
        name: 'Ankara-İstanbul',
        kalkis: 'Ankara',
        varis: 'İstanbul',
        kalkisSaat: '14:00',
        price: 500,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '19:00',
      },
      {
        id: 5,
        name: 'İstanbul-İzmir',
        kalkis: 'İstanbul',
        varis: 'İzmir',
        kalkisSaat: '08:00',
        price: 800,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '14:00',
      },
      {
        id: 6,
        name: 'İzmir-İstanbul',
        kalkis: 'İzmir',
        varis: 'İstanbul',
        kalkisSaat: '12:00',
        price: 800,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '18:00',
      },
      {
        id: 7,
        name: 'İstanbul-Edirne',
        kalkis: 'İstanbul',
        varis: 'Edirne',
        kalkisSaat: '10:00',
        price: 350,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '12:30',
      },
      {
        id: 8,
        name: 'Edirne-İstanbul',
        kalkis: 'Edirne',
        varis: 'İstanbul',
        kalkisSaat: '11:00',
        price: 350,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '13:30',
      },
      {
        id: 9,
        name: 'İstanbul-Tekirdağ',
        kalkis: 'İstanbul',
        varis: 'Tekirdağ',
        kalkisSaat: '10:00',
        price: 400,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '13:30',
      },
      {
        id: 10,
        name: 'Tekirdağ-İstanbul',
        kalkis: 'Tekirdağ',
        varis: 'İstanbul',
        kalkisSaat: '14:30',
        price: 400,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '18:00',
      },
      {
        id: 11,
        name: 'İstanbul-Antalya',
        kalkis: 'İstanbul',
        varis: 'Antalya',
        kalkisSaat: '09:30',
        price: 850,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '21:30',
      },
      {
        id: 12,
        name: 'Antalya-İstanbul',
        kalkis: 'Antalya',
        varis: 'İstanbul',
        kalkisSaat: '17:00',
        price: 850,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '05:00',
      },
      {
        id: 13,
        name: 'İstanbul-Sivas',
        kalkis: 'İstanbul',
        varis: 'Sivas',
        kalkisSaat: '17:30',
        price: 1200,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '08:30',
      },
      {
        id: 14,
        name: 'Sivas-İstanbul',
        kalkis: 'Sivas',
        varis: 'İstanbul',
        kalkisSaat: '19:15',
        price: 1200,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '08:30',
      },
      {
        id: 15,
        name: 'İstanbul-Bursa',
        kalkis: 'İstanbul',
        varis: 'Bursa',
        kalkisSaat: '07:00',
        price: 450,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '10:15',
      },
      {
        id: 16,
        name: 'İstanbul-Kars',
        kalkis: 'İstanbul',
        varis: 'Kars',
        kalkisSaat: '18:45',
        price: 1400,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '13:00',
      },
      {
        id: 17,
        name: 'Sivas-Eskişehir',
        kalkis: 'Sivas',
        varis: 'Eskişehir',
        kalkisSaat: '10:00',
        price: 900,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '17:00',
      },
      {
        id: 18,
        name: 'Eskişehir-Sivas',
        kalkis: 'Eskişehir',
        varis: 'Sivas',
        kalkisSaat: '17:00',
        price: 900,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '24:30',
      },
      {
        id: 19,
        name: 'Antalya-Edirne',
        kalkis: 'Antalya',
        varis: 'Edirne',
        kalkisSaat: '14:00',
        price: 1300,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '05:00',
      },
      {
        id: 20,
        name: 'Edirne-Antalya',
        kalkis: 'Edirne',
        varis: 'Antalya',
        kalkisSaat: '09:00',
        price: 1200,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '24:00',
      },
    ],
    [
      {
        id: 12,
        name: 'Antalya-İstanbul',
        kalkis: 'Antalya',
        varis: 'İstanbul',
        kalkisSaat: '17:00',
        price: 850,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '05:00',
      },
      {
        id: 13,
        name: 'İstanbul-Sivas',
        kalkis: 'İstanbul',
        varis: 'Sivas',
        kalkisSaat: '17:30',
        price: 1200,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '08:30',
      },
      {
        id: 3,
        name: 'İstanbul-İzmir',
        kalkis: 'İstanbul',
        varis: 'İzmir',
        kalkisSaat: '08:00',
        price: 800,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '14:00',
      },
      {
        id: 4,
        name: 'İzmir-İstanbul',
        kalkis: 'İzmir',
        varis: 'İstanbul',
        kalkisSaat: '12:00',
        price: 800,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '18:00',
      },
      {
        id: 5,
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
        id: 6,
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
        id: 7,
        name: 'İstanbul-Edirne',
        kalkis: 'İstanbul',
        varis: 'Edirne',
        kalkisSaat: '10:00',
        price: 350,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '12:30',
      },
      {
        id: 8,
        name: 'Edirne-İstanbul',
        kalkis: 'Edirne',
        varis: 'İstanbul',
        kalkisSaat: '11:00',
        price: 350,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '13:30',
      },
      {
        id: 1,
        name: 'Sivas-Eskişehir',
        kalkis: 'Sivas',
        varis: 'Eskişehir',
        kalkisSaat: '10:00',
        price: 900,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '17:00',
      },
      {
        id: 2,
        name: 'Eskişehir-Sivas',
        kalkis: 'Eskişehir',
        varis: 'Sivas',
        kalkisSaat: '17:00',
        price: 900,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '24:30',
      },
      {
        id: 9,
        name: 'İstanbul-Tekirdağ',
        kalkis: 'İstanbul',
        varis: 'Tekirdağ',
        kalkisSaat: '10:00',
        price: 400,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '13:30',
      },
      {
        id: 10,
        name: 'Tekirdağ-İstanbul',
        kalkis: 'Tekirdağ',
        varis: 'İstanbul',
        kalkisSaat: '14:30',
        price: 400,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '18:00',
      },
      {
        id: 11,
        name: 'İstanbul-Antalya',
        kalkis: 'İstanbul',
        varis: 'Antalya',
        kalkisSaat: '09:30',
        price: 850,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '21:30',
      },

      {
        id: 14,
        name: 'Sivas-İstanbul',
        kalkis: 'Sivas',
        varis: 'İstanbul',
        kalkisSaat: '19:15',
        price: 1200,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '08:30',
      },
      {
        id: 15,
        name: 'İstanbul-Bursa',
        kalkis: 'İstanbul',
        varis: 'Bursa',
        kalkisSaat: '07:00',
        price: 450,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '10:15',
      },
      {
        id: 16,
        name: 'İstanbul-Kars',
        kalkis: 'İstanbul',
        varis: 'Kars',
        kalkisSaat: '18:45',
        price: 1400,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '13:00',
      },
      {
        id: 17,
        name: 'Ankara-İstanbul',
        kalkis: 'İstanbul',
        varis: 'Ankara',
        kalkisSaat: '09:00',
        price: 500,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '14:30',
      },
      {
        id: 18,
        name: 'İstanbul-Ankara',
        kalkis: 'Ankara',
        varis: 'İstanbul',
        kalkisSaat: '14:00',
        price: 500,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '19:00',
      },
      {
        id: 19,
        name: 'Antalya-Edirne',
        kalkis: 'Antalya',
        varis: 'Edirne',
        kalkisSaat: '14:00',
        price: 1300,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '05:00',
      },
      {
        id: 20,
        name: 'Edirne-Antalya',
        kalkis: 'Edirne',
        varis: 'Antalya',
        kalkisSaat: '09:00',
        price: 1200,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '24:00',
      },
    ],
    [
      {
        id: 17,
        name: 'Sivas-Eskişehir',
        kalkis: 'Sivas',
        varis: 'Eskişehir',
        kalkisSaat: '10:00',
        price: 900,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '17:00',
      },
      {
        id: 18,
        name: 'Eskişehir-Sivas',
        kalkis: 'Eskişehir',
        varis: 'Sivas',
        kalkisSaat: '17:00',
        price: 900,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '24:30',
      },
      {
        id: 19,
        name: 'Antalya-Edirne',
        kalkis: 'Antalya',
        varis: 'Edirne',
        kalkisSaat: '14:00',
        price: 1300,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '05:00',
      },
      {
        id: 20,
        name: 'Edirne-Antalya',
        kalkis: 'Edirne',
        varis: 'Antalya',
        kalkisSaat: '09:00',
        price: 1200,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '24:00',
      },
      {
        id: 5,
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
        id: 6,
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
        id: 7,
        name: 'İstanbul-Edirne',
        kalkis: 'İstanbul',
        varis: 'Edirne',
        kalkisSaat: '10:00',
        price: 350,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '12:30',
      },
      {
        id: 8,
        name: 'Edirne-İstanbul',
        kalkis: 'Edirne',
        varis: 'İstanbul',
        kalkisSaat: '11:00',
        price: 350,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '13:30',
      },
      {
        id: 9,
        name: 'İstanbul-Tekirdağ',
        kalkis: 'İstanbul',
        varis: 'Tekirdağ',
        kalkisSaat: '10:00',
        price: 400,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '13:30',
      },
      {
        id: 10,
        name: 'Tekirdağ-İstanbul',
        kalkis: 'Tekirdağ',
        varis: 'İstanbul',
        kalkisSaat: '14:30',
        price: 400,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '18:00',
      },
      {
        id: 11,
        name: 'İstanbul-Antalya',
        kalkis: 'İstanbul',
        varis: 'Antalya',
        kalkisSaat: '09:30',
        price: 850,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '21:30',
      },
      {
        id: 12,
        name: 'Antalya-İstanbul',
        kalkis: 'Antalya',
        varis: 'İstanbul',
        kalkisSaat: '17:00',
        price: 850,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '05:00',
      },
      {
        id: 13,
        name: 'İstanbul-Sivas',
        kalkis: 'İstanbul',
        varis: 'Sivas',
        kalkisSaat: '17:30',
        price: 1200,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '08:30',
      },
      {
        id: 14,
        name: 'Sivas-İstanbul',
        kalkis: 'Sivas',
        varis: 'İstanbul',
        kalkisSaat: '19:15',
        price: 1200,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '08:30',
      },
      {
        id: 15,
        name: 'İstanbul-Bursa',
        kalkis: 'İstanbul',
        varis: 'Bursa',
        kalkisSaat: '07:00',
        price: 450,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '10:15',
      },
      {
        id: 16,
        name: 'İstanbul-Kars',
        kalkis: 'İstanbul',
        varis: 'Kars',
        kalkisSaat: '18:45',
        price: 1400,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '13:00',
      },
      {
        id: 1,
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
      {
        id: 2,
        name: 'Ankara-İstanbul',
        kalkis: 'Ankara',
        varis: 'İstanbul',
        kalkisSaat: '14:00',
        price: 500,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '19:00',
      },
      {
        id: 3,
        name: 'İstanbul-İzmir',
        kalkis: 'İstanbul',
        varis: 'İzmir',
        kalkisSaat: '08:00',
        price: 800,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '14:00',
      },
      {
        id: 3,
        name: 'İstanbul-İzmir',
        kalkis: 'İstanbul',
        varis: 'İzmir',
        kalkisSaat: '08:00',
        price: 800,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '14:00',
      },
    ],
    [
      {
        id: 10,
        name: 'Tekirdağ-İstanbul',
        kalkis: 'Tekirdağ',
        varis: 'İstanbul',
        kalkisSaat: '14:30',
        price: 400,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '18:00',
      },
      {
        id: 5,
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
        id: 6,
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
        id: 7,
        name: 'İstanbul-Edirne',
        kalkis: 'İstanbul',
        varis: 'Edirne',
        kalkisSaat: '10:00',
        price: 350,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '12:30',
      },
      {
        id: 8,
        name: 'Edirne-İstanbul',
        kalkis: 'Edirne',
        varis: 'İstanbul',
        kalkisSaat: '11:00',
        price: 350,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '13:30',
      },
      {
        id: 9,
        name: 'İstanbul-Tekirdağ',
        kalkis: 'İstanbul',
        varis: 'Tekirdağ',
        kalkisSaat: '10:00',
        price: 400,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '13:30',
      },

      {
        id: 1,
        name: 'Sivas-Eskişehir',
        kalkis: 'Sivas',
        varis: 'Eskişehir',
        kalkisSaat: '10:00',
        price: 900,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '17:00',
      },
      {
        id: 2,
        name: 'Eskişehir-Sivas',
        kalkis: 'Eskişehir',
        varis: 'Sivas',
        kalkisSaat: '17:00',
        price: 900,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '24:30',
      },

      {
        id: 3,
        name: 'İstanbul-İzmir',
        kalkis: 'İstanbul',
        varis: 'İzmir',
        kalkisSaat: '08:00',
        price: 800,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '14:00',
      },
      {
        id: 4,
        name: 'İzmir-İstanbul',
        kalkis: 'İzmir',
        varis: 'İstanbul',
        kalkisSaat: '12:00',
        price: 800,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '18:00',
      },
      {
        id: 11,
        name: 'İstanbul-Antalya',
        kalkis: 'İstanbul',
        varis: 'Antalya',
        kalkisSaat: '09:30',
        price: 850,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '21:30',
      },
      {
        id: 12,
        name: 'Antalya-İstanbul',
        kalkis: 'Antalya',
        varis: 'İstanbul',
        kalkisSaat: '17:00',
        price: 850,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '05:00',
      },
      {
        id: 13,
        name: 'İstanbul-Sivas',
        kalkis: 'İstanbul',
        varis: 'Sivas',
        kalkisSaat: '17:30',
        price: 1200,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '08:30',
      },
      {
        id: 14,
        name: 'Sivas-İstanbul',
        kalkis: 'Sivas',
        varis: 'İstanbul',
        kalkisSaat: '19:15',
        price: 1200,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '08:30',
      },
      {
        id: 15,
        name: 'İstanbul-Bursa',
        kalkis: 'İstanbul',
        varis: 'Bursa',
        kalkisSaat: '07:00',
        price: 450,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '10:15',
      },
      {
        id: 16,
        name: 'İstanbul-Kars',
        kalkis: 'İstanbul',
        varis: 'Kars',
        kalkisSaat: '18:45',
        price: 1400,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '13:00',
      },
      {
        id: 17,
        name: 'Ankara-İstanbul',
        kalkis: 'İstanbul',
        varis: 'Ankara',
        kalkisSaat: '09:00',
        price: 500,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '14:30',
      },
      {
        id: 18,
        name: 'İstanbul-Ankara',
        kalkis: 'Ankara',
        varis: 'İstanbul',
        kalkisSaat: '14:00',
        price: 500,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '19:00',
      },
      {
        id: 19,
        name: 'Antalya-Edirne',
        kalkis: 'Antalya',
        varis: 'Edirne',
        kalkisSaat: '14:00',
        price: 1300,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '05:00',
      },
      {
        id: 20,
        name: 'Edirne-Antalya',
        kalkis: 'Edirne',
        varis: 'Antalya',
        kalkisSaat: '09:00',
        price: 1200,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '24:00',
      },
    ],
    [
      {
        id: 14,
        name: 'Sivas-İstanbul',
        kalkis: 'Sivas',
        varis: 'İstanbul',
        kalkisSaat: '19:15',
        price: 1200,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '08:30',
      },
      {
        id: 15,
        name: 'İstanbul-Bursa',
        kalkis: 'İstanbul',
        varis: 'Bursa',
        kalkisSaat: '07:00',
        price: 450,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '10:15',
      },

      {
        id: 1,
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
      {
        id: 2,
        name: 'Ankara-İstanbul',
        kalkis: 'Ankara',
        varis: 'İstanbul',
        kalkisSaat: '14:00',
        price: 500,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '19:00',
      },
      {
        id: 16,
        name: 'İstanbul-Kars',
        kalkis: 'İstanbul',
        varis: 'Kars',
        kalkisSaat: '18:45',
        price: 1400,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '13:00',
      },
      {
        id: 17,
        name: 'Sivas-Eskişehir',
        kalkis: 'Sivas',
        varis: 'Eskişehir',
        kalkisSaat: '10:00',
        price: 900,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '17:00',
      },
      {
        id: 18,
        name: 'Eskişehir-Sivas',
        kalkis: 'Eskişehir',
        varis: 'Sivas',
        kalkisSaat: '17:00',
        price: 900,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '24:30',
      },

      {
        id: 5,
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
        id: 6,
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
        id: 7,
        name: 'İstanbul-Edirne',
        kalkis: 'İstanbul',
        varis: 'Edirne',
        kalkisSaat: '10:00',
        price: 350,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '12:30',
      },
      {
        id: 8,
        name: 'Edirne-İstanbul',
        kalkis: 'Edirne',
        varis: 'İstanbul',
        kalkisSaat: '11:00',
        price: 350,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '13:30',
      },
      {
        id: 19,
        name: 'Antalya-Edirne',
        kalkis: 'Antalya',
        varis: 'Edirne',
        kalkisSaat: '14:00',
        price: 1300,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '05:00',
      },
      {
        id: 20,
        name: 'Edirne-Antalya',
        kalkis: 'Edirne',
        varis: 'Antalya',
        kalkisSaat: '09:00',
        price: 1200,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '24:00',
      },
      {
        id: 9,
        name: 'İstanbul-Tekirdağ',
        kalkis: 'İstanbul',
        varis: 'Tekirdağ',
        kalkisSaat: '10:00',
        price: 400,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '13:30',
      },
      {
        id: 10,
        name: 'Tekirdağ-İstanbul',
        kalkis: 'Tekirdağ',
        varis: 'İstanbul',
        kalkisSaat: '14:30',
        price: 400,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '18:00',
      },
      {
        id: 11,
        name: 'İstanbul-Antalya',
        kalkis: 'İstanbul',
        varis: 'Antalya',
        kalkisSaat: '09:30',
        price: 850,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '21:30',
      },
      {
        id: 12,
        name: 'Antalya-İstanbul',
        kalkis: 'Antalya',
        varis: 'İstanbul',
        kalkisSaat: '17:00',
        price: 850,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '05:00',
      },
      {
        id: 13,
        name: 'İstanbul-Sivas',
        kalkis: 'İstanbul',
        varis: 'Sivas',
        kalkisSaat: '17:30',
        price: 1200,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '08:30',
      },
      {
        id: 14,
        name: 'Sivas-İstanbul',
        kalkis: 'Sivas',
        varis: 'İstanbul',
        kalkisSaat: '19:15',
        price: 1200,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '08:30',
      },
      {
        id: 15,
        name: 'İstanbul-Bursa',
        kalkis: 'İstanbul',
        varis: 'Bursa',
        kalkisSaat: '07:00',
        price: 450,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '10:15',
      },

      {
        id: 1,
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
      {
        id: 2,
        name: 'Ankara-İstanbul',
        kalkis: 'Ankara',
        varis: 'İstanbul',
        kalkisSaat: '14:00',
        price: 500,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '19:00',
      },
      {
        id: 3,
        name: 'İstanbul-İzmir',
        kalkis: 'İstanbul',
        varis: 'İzmir',
        kalkisSaat: '08:00',
        price: 800,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '14:00',
      },
      {
        id: 3,
        name: 'İstanbul-İzmir',
        kalkis: 'İstanbul',
        varis: 'İzmir',
        kalkisSaat: '08:00',
        price: 800,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '14:00',
      },
    ],
    [
      {
        id: 16,
        name: 'İstanbul-Kars',
        kalkis: 'İstanbul',
        varis: 'Kars',
        kalkisSaat: '18:45',
        price: 1400,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '13:00',
      },
      {
        id: 17,
        name: 'Sivas-Eskişehir',
        kalkis: 'Sivas',
        varis: 'Eskişehir',
        kalkisSaat: '10:00',
        price: 900,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '17:00',
      },
      {
        id: 18,
        name: 'Eskişehir-Sivas',
        kalkis: 'Eskişehir',
        varis: 'Sivas',
        kalkisSaat: '17:00',
        price: 900,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '24:30',
      },

      {
        id: 5,
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
        id: 6,
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
        id: 7,
        name: 'İstanbul-Edirne',
        kalkis: 'İstanbul',
        varis: 'Edirne',
        kalkisSaat: '10:00',
        price: 350,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '12:30',
      },
      {
        id: 8,
        name: 'Edirne-İstanbul',
        kalkis: 'Edirne',
        varis: 'İstanbul',
        kalkisSaat: '11:00',
        price: 350,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '13:30',
      },
      {
        id: 19,
        name: 'Antalya-Edirne',
        kalkis: 'Antalya',
        varis: 'Edirne',
        kalkisSaat: '14:00',
        price: 1300,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '05:00',
      },
      {
        id: 20,
        name: 'Edirne-Antalya',
        kalkis: 'Edirne',
        varis: 'Antalya',
        kalkisSaat: '09:00',
        price: 1200,
        description: 'Connecting',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '24:00',
      },
      {
        id: 9,
        name: 'İstanbul-Tekirdağ',
        kalkis: 'İstanbul',
        varis: 'Tekirdağ',
        kalkisSaat: '10:00',
        price: 400,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '13:30',
      },
      {
        id: 10,
        name: 'Tekirdağ-İstanbul',
        kalkis: 'Tekirdağ',
        varis: 'İstanbul',
        kalkisSaat: '14:30',
        price: 400,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '18:00',
      },
      {
        id: 11,
        name: 'İstanbul-Antalya',
        kalkis: 'İstanbul',
        varis: 'Antalya',
        kalkisSaat: '09:30',
        price: 850,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '21:30',
      },
      {
        id: 12,
        name: 'Antalya-İstanbul',
        kalkis: 'Antalya',
        varis: 'İstanbul',
        kalkisSaat: '17:00',
        price: 850,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '05:00',
      },
      {
        id: 13,
        name: 'İstanbul-Sivas',
        kalkis: 'İstanbul',
        varis: 'Sivas',
        kalkisSaat: '17:30',
        price: 1200,
        description: 'Transfer',
        image:
          'https://avatars.mds.yandex.net/i?id=219a1bea96cfa637c1146ef88ff589d699f6bf3c-8439108-images-thumbs&n=13',
        seferSaat: '08:30',
      },

      {
        id: 3,
        name: 'İstanbul-İzmir',
        kalkis: 'İstanbul',
        varis: 'İzmir',
        kalkisSaat: '08:00',
        price: 800,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '14:00',
      },
      {
        id: 3,
        name: 'İstanbul-İzmir',
        kalkis: 'İstanbul',
        varis: 'İzmir',
        kalkisSaat: '08:00',
        price: 800,
        description: 'Transfer',
        image:
          'https://cdn.freebiesupply.com/logos/large/2x/first-class-logo-png-transparent.png',
        seferSaat: '14:00',
      },
    ],
  ];
}
