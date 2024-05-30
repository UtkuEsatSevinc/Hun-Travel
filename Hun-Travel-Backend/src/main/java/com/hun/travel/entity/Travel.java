package com.hun.travel.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.hun.travel.serializer.CustomTimeDeserializer;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import java.sql.Date;
import java.sql.Time;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "travel")
@Getter
@Setter
@RequiredArgsConstructor
public class Travel {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "driver_id")
  private User driver;

  private String departure;
  private String destination;
  private Date departureDate;

  @JsonDeserialize(using = CustomTimeDeserializer.class)
  private Time departureTime;
  private Date destinationDate;

  @JsonDeserialize(using = CustomTimeDeserializer.class)
  private Time destinationTime;
  private Integer price;
  private String licencePlate;

  @OneToMany(mappedBy = "travel")
  @OrderBy("seatNumber")
  private List<Seat> seatList;

}
