package com.hun.travel.service;

import com.hun.travel.dto.TravelDto;
import com.hun.travel.entity.Travel;
import com.hun.travel.entity.User;
import com.hun.travel.enumaration.RoleEnum;
import com.hun.travel.manager.SeatManager;
import com.hun.travel.manager.TravelManager;
import com.hun.travel.manager.UserManager;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminService {

  private final UserManager userManager;
  private final TravelManager travelManager;
  private final SeatManager seatManager;

  public Boolean addDriver(User user) {
    user.setRole(RoleEnum.DRIVER);
    return userManager.save(user);
  }

  public Boolean createTravel(Travel travel) {
    return seatManager.createSeats(travelManager.save(travel));
  }

  public Boolean assignDriver(Long travelId, Long driverId) {
    Travel travel = travelManager.find(travelId);
    travel.setDriver(userManager.find(driverId));
    travelManager.save(travel);
    return true;
  }

  public Boolean dropDriver(Long driverId) {

    if (travelManager.existByDriverId(driverId)){
      return false;
    }

    return userManager.delete(driverId);
  }

  @Transactional
  public Boolean dropTravel(Long travelId) {
    seatManager.deleteSeats(travelId);
    return travelManager.delete(travelId);
  }

  public List<User> listDrivers() {
    return userManager.listDrivers();
  }

  public List<TravelDto> listTravels(){
    return travelManager.listTravels();
  }

  public List<User> listUser() {
    return  userManager.listUsers();
  }
}
