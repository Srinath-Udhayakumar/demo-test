package com.hackathon.app.repository;

import com.hackathon.app.entity.Appointment;
import com.hackathon.app.entity.AppointmentMode;
import com.hackathon.app.entity.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByPatientId(Long patientId);

    List<Appointment> findByDoctorId(Long doctorId);

    List<Appointment> findByAppointmentDate(LocalDate date);

    List<Appointment> findByAppointmentDateAndDoctorId(LocalDate date, Long doctorId);

    @Query("SELECT a FROM Appointment a WHERE a.appointmentDate = :date AND a.mode = :mode AND a.status = :status")
    List<Appointment> findByDateAndModeAndStatus(@Param("date") LocalDate date,
                                                 @Param("mode") AppointmentMode mode,
                                                 @Param("status") AppointmentStatus status);

    List<Appointment> findByAppointmentDateBetween(LocalDate start, LocalDate end);
}
