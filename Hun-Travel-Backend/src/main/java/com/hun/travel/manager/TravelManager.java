package com.hun.travel.manager;

import com.hun.travel.dto.DriverTravelDto;
import com.hun.travel.dto.TravelDto;
import com.hun.travel.entity.Travel;
import com.hun.travel.filter.TravelFilter;
import com.hun.travel.mapper.DriverTravelMapper;
import com.hun.travel.mapper.TravelMapper;
import com.hun.travel.repository.TravelRepository;
import com.hun.travel.spec.TravelSpecification;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TravelManager {

  private final TravelRepository repo;

  public Travel find(Long id) {
    return repo.findById(id).orElse(null);
  }

  public List<Travel> list() {
    return repo.findAll();
  }

  public Travel save(Travel travel) {
    return repo.save(travel);
  }

  public Boolean delete(Long id) {

    Travel check = find(id);

    if (check == null) {
      return false;
    }

    repo.deleteById(id);
    return true;
  }

  public Boolean existByDriverId(Long id) {
    return repo.existsByDriver_id(id);
  }

  public List<TravelDto> listTravels() {
    return TravelMapper.mapList(repo.findAll(Sort.by("id")));
  }

  public List<DriverTravelDto> findByDriverId(Long driverId) {
    return DriverTravelMapper.mapList(repo.findAllByDriver_Id(driverId));
  }

  public List<TravelDto> searchTravels(TravelFilter filter) {

    return TravelMapper.mapList(repo.findAll(TravelSpecification.filter(filter)));

  }
}
