package com.hackathon.app.repository;

import com.hackathon.app.entity.AppointmentMode;
import com.hackathon.app.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findByMode(AppointmentMode mode);
    List<Doctor> findBySpecialtyId(Long specialtyId);
    List<Doctor> findBySpecialtyIdAndMode(Long specialtyId, AppointmentMode mode);
    List<Doctor> findByAvailableTrue();
}
