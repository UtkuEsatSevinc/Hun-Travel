package com.hun.travel.mapper;

import com.hun.travel.dto.DriverTravelDto;
import com.hun.travel.entity.Seat;
import com.hun.travel.entity.Travel;
import java.util.List;

public class DriverTravelMapper {

  public static DriverTravelDto map(Travel travel){
    return DriverTravelDto.builder()
        .id(travel.getId())
        .departure(travel.getDeparture())
        .departureDate(travel.getDepartureDate())
        .departureTime(travel.getDepartureTime())
        .destination(travel.getDestination())
        .destinationDate(travel.getDestinationDate())
        .destinationTime(travel.getDestinationTime())
        .price(travel.getPrice())
        .licencePlate(travel.getLicencePlate())
        .seatList(SeatMapper.mapList(travel.getSeatList()))
        .build();
  }

  public static List<DriverTravelDto> mapList(List<Travel> travelList){
    return travelList.stream().map(DriverTravelMapper::map).toList();
  }

}
