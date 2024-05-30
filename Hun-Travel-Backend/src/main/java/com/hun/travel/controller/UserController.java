package com.hun.travel.controller;

import com.hun.travel.dto.TicketDto;
import com.hun.travel.dto.TravelDto;
import com.hun.travel.entity.Payment;
import com.hun.travel.entity.Travel;
import com.hun.travel.entity.User;
import com.hun.travel.filter.TravelFilter;
import com.hun.travel.service.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @PostMapping("search/travel")
  public List<TravelDto> searchTravels(@RequestBody TravelFilter filter){
    return userService.searchTravels(filter);
  }

  @GetMapping("get/travel")
  public Travel getTravel(@RequestParam Long travelId, @RequestParam Long userId){
    return userService.getTravel(travelId, userId);
  }

  @GetMapping("get/purchasedTickets")
  public List<TicketDto> getPurchasedTickets(@RequestParam Long userId){
    return userService.getPurchasedTickets(userId);
  }

  @PostMapping("pay")
  public Boolean pay(@RequestBody Payment payment, @RequestParam Long userId , @RequestParam Long seatId){
    return userService.pay(payment, userId, seatId);
  }

  @GetMapping("info")
  public User info(@RequestParam Long userId){
    return userService.info(userId);
  }

  @PostMapping("update")
  public Boolean update(@RequestBody User user){
    return userService.update(user);
  }

  @GetMapping("delete")
  public Boolean delete(@RequestParam Long userId){
    return userService.delete(userId);
  }

}
