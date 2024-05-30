package com.hun.travel.manager;

import com.hun.travel.entity.Contact;
import com.hun.travel.repository.ContactRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactManager {

  private final ContactRepository repo;


  public Boolean save(Contact contact){
    repo.save(contact);
    return true;
  }

  public List<Contact> list(){
    return repo.findAll();
  }

}
