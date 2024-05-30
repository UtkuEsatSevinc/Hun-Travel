package com.hun.travel.mapper;

import com.hun.travel.dto.TravelDto;
import com.hun.travel.entity.Travel;
import java.util.List;

public class TravelMapper {

  public static TravelDto map(Travel travel) {
    return TravelDto.builder()
        .id(travel.getId())
        .departure(travel.getDeparture())
        .departureDate(travel.getDepartureDate())
        .departureTime(travel.getDepartureTime())
        .destination(travel.getDestination())
        .destinationDate(travel.getDestinationDate())
        .destinationTime(travel.getDestinationTime())
        .price(travel.getPrice())
        .licencePlate(travel.getLicencePlate())
        .driver(travel.getDriver())
        .build();
  }

  public static List<TravelDto> mapList(List<Travel> travelList) {

    return travelList.stream().map(TravelMapper::map).toList();
  }

}
