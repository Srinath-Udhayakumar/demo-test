package com.hackathon.app.service;

import com.hackathon.app.dto.request.AppointmentRequest;
import com.hackathon.app.dto.request.UpdateStatusRequest;
import com.hackathon.app.dto.response.AppointmentResponse;
import com.hackathon.app.entity.*;
import com.hackathon.app.exception.BadRequestException;
import com.hackathon.app.exception.ResourceNotFoundException;
import com.hackathon.app.repository.AppointmentRepository;
import com.hackathon.app.repository.DoctorRepository;
import com.hackathon.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;

    public AppointmentResponse bookAppointment(Long patientId, AppointmentRequest request) {
        User patient = userRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        if (!doctor.isAvailable()) {
            throw new BadRequestException("Doctor is not available");
        }

        // Check for slot conflict
        List<Appointment> existing = appointmentRepository.findByAppointmentDateAndDoctorId(
                request.getAppointmentDate(), doctor.getId());
        boolean slotTaken = existing.stream()
                .anyMatch(a -> a.getAppointmentTime().equals(request.getAppointmentTime())
                        && (a.getStatus() == AppointmentStatus.CONFIRMED));
        if (slotTaken) {
            throw new BadRequestException("This time slot is already booked");
        }

        String videoLink = null;
        if (doctor.getMode() == AppointmentMode.ONLINE) {
            videoLink = "https://meet.hackathon.app/" + UUID.randomUUID().toString().substring(0, 8);
        }

        Appointment appointment = Appointment.builder()
                .patient(patient)
                .doctor(doctor)
                .appointmentDate(request.getAppointmentDate())
                .appointmentTime(request.getAppointmentTime())
                .mode(doctor.getMode())
                .status(AppointmentStatus.CONFIRMED)
                .notes(request.getNotes())
                .videoLink(videoLink)
                .build();

        return toResponse(appointmentRepository.save(appointment));
    }

    public List<AppointmentResponse> getMyAppointments(Long patientId) {
        return appointmentRepository.findByPatientId(patientId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<AppointmentResponse> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public AppointmentResponse updateStatus(Long appointmentId, UpdateStatusRequest request, Long userId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
        appointment.setStatus(request.getStatus());
        return toResponse(appointmentRepository.save(appointment));
    }

    private AppointmentResponse toResponse(Appointment a) {
        return AppointmentResponse.builder()
                .id(a.getId())
                .patientName(a.getPatient().getName())
                .doctorName(a.getDoctor().getName())
                .specialtyName(a.getDoctor().getSpecialty().getName())
                .appointmentDate(a.getAppointmentDate())
                .appointmentTime(a.getAppointmentTime())
                .mode(a.getMode().name())
                .status(a.getStatus().name())
                .notes(a.getNotes())
                .videoLink(a.getVideoLink())
                .consultationFee(a.getDoctor().getConsultationFee())
                .createdAt(a.getCreatedAt())
                .build();
    }
}
