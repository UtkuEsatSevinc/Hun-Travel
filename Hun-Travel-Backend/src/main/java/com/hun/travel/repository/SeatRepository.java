package com.hun.travel.repository;

import com.hun.travel.entity.Seat;
import com.hun.travel.entity.Travel;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat , Long> {

  void deleteByTravel_Id(Long travelId);

  List<Seat> findAllByUser_Id(Long userId);

  Seat findByTravel_IdAndSeatNumber(Long travelId, Integer seatNumber);

}
