package com.hun.travel.manager;

import com.hun.travel.entity.Seat;
import com.hun.travel.entity.Travel;
import com.hun.travel.repository.SeatRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SeatManager {

  private final SeatRepository repo;

  public Seat find(Long id) {
    return repo.findById(id).orElse(null);
  }
  public Seat find(Long travelId, Integer seatNumber){
    return repo.findByTravel_IdAndSeatNumber(travelId, seatNumber);
  }

  public List<Seat> findAllByUserId(Long userId){
    return repo.findAllByUser_Id(userId);
  }

  public List<Seat> list() {
    return repo.findAll();
  }

  public void save(Seat seat) {
    repo.save(seat);
  }
  public void saveAll(List<Seat> seatList){
    repo.saveAll(seatList);
  }

  public void delete(Long id) {
    repo.deleteById(id);
  }

  public Boolean createSeats(Travel travel) {
    int seats = 31;
    List<Seat> seatList = new ArrayList<>(seats);
    for (int i = 1; i <= seats; i++) {
      Seat seat = new Seat();
      seat.setSeatNumber(i);
      seat.setTravel(travel);
      seat.setIsClickable(true);
      seatList.add(seat);
    }
    saveAll(seatList);
    return true;
  }

  public void deleteSeats(Long id) {
    repo.deleteByTravel_Id(id);
  }

}
