package com.hun.travel.service;

import com.hun.travel.dto.DriverTravelDto;
import com.hun.travel.manager.TravelManager;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DriverService {

  private final TravelManager travelManager;

  public List<DriverTravelDto> getDriverTravels(Long driverId){
    return travelManager.findByDriverId(driverId);
  }


}
