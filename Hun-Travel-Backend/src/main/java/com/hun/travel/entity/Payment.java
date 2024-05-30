package com.hun.travel.entity;

import com.hun.travel.enumaration.PaymentMethodEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "payment")
@Getter
@Setter
@RequiredArgsConstructor
public class Payment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;


  private String name;
  private String surname;
  private String country;
  private String city;
  private String address;
  private String zipCode;
  private String mail;
  private String phoneNumber;
  private String cardHolderName;
  private String expYear;
  private String expMonth;
  private String cardNumber;
  private String cvv;

  @Enumerated(EnumType.STRING)
  private PaymentMethodEnum paymentMethod;

}
