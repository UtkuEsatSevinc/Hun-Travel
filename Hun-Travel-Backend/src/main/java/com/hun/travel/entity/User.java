package com.hun.travel.entity;

import com.hun.travel.enumaration.GenderEnum;
import com.hun.travel.enumaration.RoleEnum;
import jakarta.persistence.Column;
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
@Table(name = "users")
@Getter
@Setter
@RequiredArgsConstructor
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private String surname;
  private String password;

  @Column(name = "email", nullable = false, unique = true)
  private String email;

  private String phoneNumber;
  private String tc;
  private String licence;

  @Enumerated(EnumType.STRING)
  private GenderEnum gender;

  @Enumerated(EnumType.STRING)
  private RoleEnum role;


}
