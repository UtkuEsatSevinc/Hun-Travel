package com.hun.travel.mapper;

import com.hun.travel.dto.TicketDto;
import com.hun.travel.entity.Seat;

public class TicketMapper {

  public static TicketDto map(Seat seat) {
    return TicketDto.builder()
        .travelId(seat.getTravel().getId())
        .departure(seat.getTravel().getDeparture())
        .departureDate(seat.getTravel().getDepartureDate())
        .departureTime(seat.getTravel().getDepartureTime())
        .destination(seat.getTravel().getDestination())
        .destinationDate(seat.getTravel().getDestinationDate())
        .destinationTime(seat.getTravel().getDestinationTime())
        .price(seat.getTravel().getPrice())
        .seatId(seat.getId())
        .licencePlate(seat.getTravel().getLicencePlate())
        .seatNumber(seat.getSeatNumber())
        .build();
  }
}
