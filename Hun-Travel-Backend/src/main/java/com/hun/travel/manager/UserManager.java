package com.hun.travel.manager;

import com.hun.travel.entity.User;
import com.hun.travel.enumaration.RoleEnum;
import com.hun.travel.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserManager {

  private final UserRepository repo;

  public User find(Long id) {
    return repo.findById(id).orElse(null);
  }

  public User find(String email) {
    Optional<User> optionalUser = repo.findByEmail(email);
    return optionalUser.orElse(null);

  }

  public List<User> list() {
    return repo.findAll();
  }

  public Boolean save(User user) {

    User check = find(user.getEmail());

    if (check != null) {
      return false;
    }

    repo.save(user);
    return true;
  }

  public Boolean delete(Long id) {

    User check = find(id);

    if (check == null) {
      return false;
    }

    repo.deleteById(id);
    return true;
  }

  public List<User> listDrivers() {
    return repo.findAllByRoleOrderById(RoleEnum.DRIVER);
  }


  public Boolean update(User user) {

    User temp = repo.findById(user.getId()).orElse(null);

    if (temp == null) {
      return false;
    }

    if (user.getName() != null && !user.getName().isEmpty()) {
      temp.setName(user.getName());
    }
    if (user.getSurname() != null && !user.getSurname().isEmpty()) {
      temp.setSurname(user.getSurname());
    }
    if (user.getPassword() != null && !user.getPassword().isEmpty()) {
      temp.setPassword(user.getPassword());
    }
    if (user.getEmail() != null && !user.getEmail().isEmpty()) {
      temp.setEmail(user.getEmail());
    }
    if (user.getPhoneNumber() != null && !user.getPhoneNumber().isEmpty()) {
      temp.setPhoneNumber(user.getPhoneNumber());
    }
    if (user.getTc() != null && !user.getTc().isEmpty()) {
      temp.setTc(user.getTc());
    }

    repo.save(temp);

    return true;
  }

  public List<User> listUsers() {
    return repo.findAllByRoleOrderById(RoleEnum.USER);
  }
}
