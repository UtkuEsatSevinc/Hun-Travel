package com.hun.travel.service;

import com.hun.travel.dto.TicketDto;
import com.hun.travel.dto.TravelDto;
import com.hun.travel.entity.Payment;
import com.hun.travel.entity.Seat;
import com.hun.travel.entity.Travel;
import com.hun.travel.entity.User;
import com.hun.travel.enumaration.GenderEnum;
import com.hun.travel.filter.TravelFilter;
import com.hun.travel.manager.PaymentManager;
import com.hun.travel.manager.SeatManager;
import com.hun.travel.manager.TravelManager;
import com.hun.travel.manager.UserManager;
import com.hun.travel.mapper.TicketMapper;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

  private final TravelManager travelManager;
  private final PaymentManager paymentManager;
  private final SeatManager seatManager;
  private final UserManager userManager;

  public Travel getTravel(Long travelId, Long userId) {

    Travel travel = travelManager.find(travelId);
    User user = userManager.find(userId);

    if (travel == null || user == null) {
      return null;
    }

    GenderEnum gender = user.getGender();
    List<Seat> seatList = travel.getSeatList();

    int[][] pairedSeats = {{1, 2}, {4, 5}, {7, 8}, {10, 11}, {13, 14}, {16, 17}, {19, 20}, {22, 23},
        {24, 25}, {26, 27}, {29, 30}};

    for (int[] pair : pairedSeats) {
      int index1 = pair[0] - 1;
      int index2 = pair[1] - 1;

      Seat seat1 = seatList.get(index1);
      Seat seat2 = seatList.get(index2);

      if (seat1.getIsClickable() && !seat2.getIsClickable() && seat2.getGender() != gender) {
        seat1.setIsClickable(false);
      } else if (!seat1.getIsClickable() && seat2.getIsClickable() && seat1.getGender() != gender) {
        seat2.setIsClickable(false);
      }
    }

    return travel;
  }

  @Transactional
  public Boolean pay(Payment payment, Long userId, Long seatId) {

    paymentManager.save(payment);

    Seat seat = seatManager.find(seatId);
    User user = userManager.find(userId);

    if (seat == null || user == null || !seat.getIsClickable()) {
      return false;
    }

    seat.setIsClickable(false);
    seat.setGender(user.getGender());
    seat.setUser(user);

    seatManager.save(seat);

    return true;
  }

  @Transactional
  public List<TicketDto> getPurchasedTickets(Long userId) {

    List<Seat> seatList = seatManager.findAllByUserId(userId);
    List<TicketDto> ticketDtoList = new ArrayList<>();

    for (Seat seat : seatList) {
      ticketDtoList.add(TicketMapper.map(seat));
    }

    return ticketDtoList;
  }

  public User info(Long userId) {
    return userManager.find(userId);
  }

  public Boolean update(User user) {
    return userManager.update(user);
  }

  public Boolean delete(Long userId) {
    return userManager.delete(userId);
  }

  public List<TravelDto> searchTravels(TravelFilter filter) {
    return travelManager.searchTravels(filter);
  }
}
