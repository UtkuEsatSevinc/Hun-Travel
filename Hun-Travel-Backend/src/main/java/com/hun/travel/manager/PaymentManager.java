package com.hun.travel.manager;

import com.hun.travel.entity.Payment;
import com.hun.travel.repository.PaymentRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentManager {

  private final PaymentRepository repo;

  public Payment find(Long id){
    return repo.findById(id).get();
  }

  public List<Payment> list(){
    return repo.findAll();
  }

  public void save(Payment payment){
    repo.save(payment);
  }

  public void delete(Long id){
    repo.deleteById(id);
  }

}
