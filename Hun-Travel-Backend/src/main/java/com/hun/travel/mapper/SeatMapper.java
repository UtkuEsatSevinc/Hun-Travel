package com.hun.travel.mapper;

import com.hun.travel.dto.SeatDto;
import com.hun.travel.entity.Seat;
import java.util.List;

public class SeatMapper {

  public static SeatDto map(Seat seat) {
    return SeatDto.builder()
        .name(seat.getUser().getName())
        .surname(seat.getUser().getSurname())
        .gender(seat.getUser().getGender())
        .seatNumber(seat.getSeatNumber())
        .build();
  }

  public static List<SeatDto> mapList(List<Seat> seatList) {
    return seatList.stream().map(seat -> {
          if (seat.getUser() != null) {
            return map(seat);
          }
          return null;
        }
    ).toList();
  }

}
