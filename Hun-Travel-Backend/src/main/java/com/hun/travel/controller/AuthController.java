package com.hun.travel.controller;

import com.hun.travel.dto.LoginDto;
import com.hun.travel.entity.User;
import com.hun.travel.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  @PostMapping("login")
  private User login(@RequestBody LoginDto loginDto){
    return authService.login(loginDto);
  }

  @PostMapping("register")
  private Boolean register(@RequestBody User user){
    return authService.register(user);
  }


}
