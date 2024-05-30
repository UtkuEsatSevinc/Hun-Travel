package com.hun.travel.service;

import com.hun.travel.dto.LoginDto;
import com.hun.travel.entity.User;
import com.hun.travel.enumaration.RoleEnum;
import com.hun.travel.manager.UserManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final UserManager userManager;

  public User login(LoginDto loginDto) {

    User user = userManager.find(loginDto.getEmail());

    if (user == null) {
      return null;
    }

    if (user.getPassword().equals(loginDto.getPassword())) {
      return user;
    }

    return null;
  }

  public Boolean register(User user) {
    user.setRole(RoleEnum.USER);
    return userManager.save(user);
  }

}
