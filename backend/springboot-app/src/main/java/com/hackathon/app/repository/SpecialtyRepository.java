package com.hackathon.app.repository;

import com.hackathon.app.entity.Specialty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecialtyRepository extends JpaRepository<Specialty, Long> {
    boolean existsByName(String name);
}
