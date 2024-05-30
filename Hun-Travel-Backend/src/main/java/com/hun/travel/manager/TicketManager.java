package com.hun.travel.manager;

import com.hun.travel.entity.Ticket;
import com.hun.travel.repository.TicketRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TicketManager {

  private final TicketRepository repo;

  public Ticket find(Long id){
    return repo.findById(id).get();
  }

  public List<Ticket> list(){
    return repo.findAll();
  }

  public void save(Ticket ticket){
    repo.save(ticket);
  }

  public void delete(Long id){
    repo.deleteById(id);
  }

}
