package com.hun.travel.repository;

import com.hun.travel.entity.Travel;
import java.util.List;
import org.hibernate.boot.model.source.spi.Sortable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface TravelRepository extends JpaRepository<Travel, Long>, JpaSpecificationExecutor<Travel>,
    PagingAndSortingRepository<Travel, Long> {

  Boolean existsByDriver_id(Long driverId);
  List<Travel> findAllByDriver_Id(Long driverId);

}
