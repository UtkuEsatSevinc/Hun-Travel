import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnasayfaPageComponent } from './anasayfa-page.component';

describe('AnasayfaPageComponent', () => {
  let component: AnasayfaPageComponent;
  let fixture: ComponentFixture<AnasayfaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnasayfaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnasayfaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
