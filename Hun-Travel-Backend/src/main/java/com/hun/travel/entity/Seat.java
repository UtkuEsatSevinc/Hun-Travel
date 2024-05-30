package com.hun.travel.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hun.travel.enumaration.GenderEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "seat")
@Getter
@Setter
@RequiredArgsConstructor
@JsonIgnoreProperties({"travel", "user"})

public class Seat {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Integer seatNumber;


  @ManyToOne
  @JoinColumn(name = "travel_id")
  private Travel travel;
  private Boolean isClickable;

  @Enumerated(EnumType.STRING)
  private GenderEnum gender;


  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

}
