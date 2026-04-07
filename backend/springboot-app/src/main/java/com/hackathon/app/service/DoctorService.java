package com.hackathon.app.service;

import com.hackathon.app.dto.request.DoctorRequest;
import com.hackathon.app.dto.response.DoctorResponse;
import com.hackathon.app.entity.AppointmentMode;
import com.hackathon.app.entity.Doctor;
import com.hackathon.app.entity.Specialty;
import com.hackathon.app.exception.ResourceNotFoundException;
import com.hackathon.app.repository.DoctorRepository;
import com.hackathon.app.repository.SpecialtyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final SpecialtyRepository specialtyRepository;

    public List<DoctorResponse> getAllDoctors() {
        return doctorRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<DoctorResponse> getDoctorsByMode(String mode) {
        AppointmentMode appointmentMode = AppointmentMode.valueOf(mode.toUpperCase());
        return doctorRepository.findByMode(appointmentMode).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<DoctorResponse> getDoctorsBySpecialtyAndMode(Long specialtyId, String mode) {
        if (mode != null && !mode.isEmpty()) {
            AppointmentMode appointmentMode = AppointmentMode.valueOf(mode.toUpperCase());
            return doctorRepository.findBySpecialtyIdAndMode(specialtyId, appointmentMode).stream()
                    .map(this::toResponse)
                    .collect(Collectors.toList());
        }
        return doctorRepository.findBySpecialtyId(specialtyId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public DoctorResponse getById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        return toResponse(doctor);
    }

    public DoctorResponse createDoctor(DoctorRequest request) {
        Specialty specialty = specialtyRepository.findById(request.getSpecialtyId())
                .orElseThrow(() -> new ResourceNotFoundException("Specialty not found"));
        Doctor doctor = Doctor.builder()
                .name(request.getName())
                .email(request.getEmail())
                .specialty(specialty)
                .mode(request.getMode())
                .available(true)
                .consultationFee(request.getConsultationFee())
                .availableSlots(request.getAvailableSlots())
                .build();
        return toResponse(doctorRepository.save(doctor));
    }

    public DoctorResponse updateAvailability(Long id, boolean available) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));
        doctor.setAvailable(available);
        return toResponse(doctorRepository.save(doctor));
    }

    private DoctorResponse toResponse(Doctor d) {
        return DoctorResponse.builder()
                .id(d.getId())
                .name(d.getName())
                .email(d.getEmail())
                .specialtyName(d.getSpecialty().getName())
                .mode(d.getMode().name())
                .available(d.isAvailable())
                .consultationFee(d.getConsultationFee())
                .availableSlots(d.getAvailableSlots())
                .build();
    }
}
