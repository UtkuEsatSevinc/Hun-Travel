package com.hun.travel.serializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class CustomTimeDeserializer extends JsonDeserializer<Time> {
  private static final SimpleDateFormat formatter = new SimpleDateFormat("HH:mm");

  @Override
  public Time deserialize(JsonParser jsonParser, DeserializationContext deserializationContext)
      throws IOException, JsonProcessingException {
    String time = jsonParser.getText();
    try {
      long ms = formatter.parse(time).getTime();
      return new Time(ms);
    } catch (ParseException e) {
      throw new RuntimeException(e);
    }
  }
}
