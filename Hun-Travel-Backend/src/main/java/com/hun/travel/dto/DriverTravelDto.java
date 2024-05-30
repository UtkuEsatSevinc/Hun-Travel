package com.hun.travel.dto;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class DriverTravelDto {

  private Long id;
  private String departure;
  private String destination;
  private Date departureDate;
  private Time departureTime;
  private Date destinationDate;
  private Time destinationTime;
  private Integer price;
  private String licencePlate;
  private List<SeatDto> seatList;

}
