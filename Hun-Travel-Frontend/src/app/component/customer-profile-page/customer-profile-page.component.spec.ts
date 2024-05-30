import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProfilePageComponent } from './customer-profile-page.component';

describe('CustomerProfilePageComponent', () => {
  let component: CustomerProfilePageComponent;
  let fixture: ComponentFixture<CustomerProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerProfilePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
