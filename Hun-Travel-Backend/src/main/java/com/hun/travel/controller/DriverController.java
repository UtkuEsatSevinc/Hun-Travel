package com.hun.travel.controller;

import com.hun.travel.dto.DriverTravelDto;
import com.hun.travel.service.DriverService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("driver")
@RequiredArgsConstructor
public class DriverController {

  private final DriverService driverService;

  @GetMapping("get/travels")
  public List<DriverTravelDto> getDriverTravels(@RequestParam Long driverId){
    return driverService.getDriverTravels(driverId);
  }

}
