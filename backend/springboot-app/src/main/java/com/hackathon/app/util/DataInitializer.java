package com.hackathon.app.util;

import com.hackathon.app.entity.*;
import com.hackathon.app.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final SpecialtyRepository specialtyRepository;
    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) return;

        // Admin user
        userRepository.save(User.builder()
                .name("Admin")
                .email("admin@clinic.com")
                .password(passwordEncoder.encode("admin123"))
                .role(Role.ADMIN)
                .build());

        // Patient user
        userRepository.save(User.builder()
                .name("John Patient")
                .email("patient@clinic.com")
                .password(passwordEncoder.encode("patient123"))
                .role(Role.PATIENT)
                .build());

        // Specialties
        Specialty cardiology = specialtyRepository.save(Specialty.builder()
                .name("Cardiology")
                .description("Heart and cardiovascular system")
                .build());

        Specialty dermatology = specialtyRepository.save(Specialty.builder()
                .name("Dermatology")
                .description("Skin, hair, and nails")
                .build());

        Specialty orthopedics = specialtyRepository.save(Specialty.builder()
                .name("Orthopedics")
                .description("Bones and joints")
                .build());

        // Online doctors (only for online consultations)
        doctorRepository.save(Doctor.builder()
                .name("Dr. Alice Smith")
                .email("alice@clinic.com")
                .specialty(cardiology)
                .mode(AppointmentMode.ONLINE)
                .available(true)
                .consultationFee(500.0)
                .availableSlots("09:00,10:00,11:00,14:00,15:00,16:00")
                .build());

        doctorRepository.save(Doctor.builder()
                .name("Dr. Bob Johnson")
                .email("bob@clinic.com")
                .specialty(dermatology)
                .mode(AppointmentMode.ONLINE)
                .available(true)
                .consultationFee(400.0)
                .availableSlots("09:00,10:00,11:00,14:00,15:00")
                .build());

        // Offline doctors (only for in-clinic visits)
        doctorRepository.save(Doctor.builder()
                .name("Dr. Carol Williams")
                .email("carol@clinic.com")
                .specialty(cardiology)
                .mode(AppointmentMode.OFFLINE)
                .available(true)
                .consultationFee(700.0)
                .availableSlots("08:00,09:00,10:00,11:00,14:00,15:00,16:00")
                .build());

        doctorRepository.save(Doctor.builder()
                .name("Dr. David Brown")
                .email("david@clinic.com")
                .specialty(orthopedics)
                .mode(AppointmentMode.OFFLINE)
                .available(true)
                .consultationFee(600.0)
                .availableSlots("09:00,10:00,11:00,14:00,15:00,16:00")
                .build());

        doctorRepository.save(Doctor.builder()
                .name("Dr. Eve Davis")
                .email("eve@clinic.com")
                .specialty(dermatology)
                .mode(AppointmentMode.OFFLINE)
                .available(true)
                .consultationFee(450.0)
                .availableSlots("10:00,11:00,14:00,15:00,16:00")
                .build());
    }
}
