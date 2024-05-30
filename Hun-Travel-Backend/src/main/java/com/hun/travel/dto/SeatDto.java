package com.hun.travel.dto;

import com.hun.travel.enumaration.GenderEnum;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SeatDto {

  private String name;
  private String surname;
  private GenderEnum gender;
  private Integer seatNumber;

}
