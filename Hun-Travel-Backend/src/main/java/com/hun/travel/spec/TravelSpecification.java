package com.hun.travel.spec;

import com.hun.travel.entity.Travel;
import com.hun.travel.filter.TravelFilter;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;

public class TravelSpecification {

  public static Specification<Travel> filter(TravelFilter filter) {
    return (Root<Travel> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {

      List<Predicate> predicateList = new ArrayList<>();

      if (filter.getDeparture() != null && !filter.getDeparture().isEmpty()) {
        predicateList.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("departure")),
            "%" + filter.getDeparture().toLowerCase() + "%"));
      }

      if (filter.getDestination() != null && !filter.getDestination().isEmpty()) {
        predicateList.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("destination")),
            "%" + filter.getDestination().toLowerCase() + "%"));
      }

      if (filter.getSearch() != null && !filter.getSearch().isEmpty()) {
        predicateList.add(criteriaBuilder.or(
            criteriaBuilder.like(criteriaBuilder.lower(root.get("destination")),
                "%" + filter.getSearch().toLowerCase() + "%"),
            criteriaBuilder.like(criteriaBuilder.lower(root.get("departure")),
                "%" + filter.getSearch().toLowerCase() + "%")
        ));
      }

      if (filter.getDate() != null && !filter.getDate().toString().isEmpty()) {
        predicateList.add(criteriaBuilder.equal(root.get("departureDate"), filter.getDate()));
      }

      return criteriaBuilder.and(predicateList.toArray(new Predicate[0]));
    };
  }

}
