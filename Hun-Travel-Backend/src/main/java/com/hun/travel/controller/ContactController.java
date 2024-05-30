package com.hun.travel.controller;

import com.hun.travel.entity.Contact;
import com.hun.travel.manager.ContactManager;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("contact")
@RequiredArgsConstructor
public class ContactController {

  private final ContactManager contactManager;

  @PostMapping("/add")
  public Boolean save(@RequestBody Contact contact){
    return contactManager.save(contact);
  }

  @GetMapping("/list")
  public List<Contact> list(){
    return contactManager.list();
  }

}
