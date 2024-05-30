package com.hun.travel.filter;

import java.sql.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TravelFilter {

  private String departure;
  private String destination;
  private String search;
  private Date date;

}
