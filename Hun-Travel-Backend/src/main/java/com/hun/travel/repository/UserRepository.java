package com.hun.travel.repository;

import com.hun.travel.entity.User;
import com.hun.travel.enumaration.RoleEnum;
import java.util.List;
import java.util.Optional;
import org.hibernate.boot.model.source.spi.Sortable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByEmail(String email);

  List<User> findAllByRoleOrderById(RoleEnum role);
}
