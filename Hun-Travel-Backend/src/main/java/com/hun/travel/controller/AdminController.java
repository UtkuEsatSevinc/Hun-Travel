package com.hun.travel.controller;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hun.travel.dto.TravelDto;
import com.hun.travel.entity.Travel;
import com.hun.travel.entity.User;
import com.hun.travel.service.AdminService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("admin")
@RequiredArgsConstructor
public class AdminController {


  private final AdminService adminService;

  @PostMapping("add/driver")
  public Boolean addDriver(@RequestBody User user){
    return adminService.addDriver(user);
  }

  @PostMapping("add/travel")
  public Boolean createTravel(@RequestBody Travel travel){
    return adminService.createTravel(travel);
  }

  @GetMapping("assign/driver")
  public Boolean assignDriver(@RequestParam Long travelId, @RequestParam Long driverId){
    return adminService.assignDriver(travelId, driverId);
  }

  @GetMapping("drop/driver")
  public Boolean dropDriver(@RequestParam Long driverId){
    return adminService.dropDriver(driverId);
  }

  @GetMapping("drop/travel")
  public Boolean dropTravel(@RequestParam Long travelId){
    return adminService.dropTravel(travelId);
  }

  @GetMapping("list/driver")
  public List<User> listDrivers(){
    return adminService.listDrivers();
  }

  @GetMapping("list/user")
  public List<User> listUser(){
    return adminService.listUser();
  }

  @GetMapping("list/travel")
  public List<TravelDto> listTravels(){
    return adminService.listTravels();
  }



}
