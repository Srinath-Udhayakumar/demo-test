package com.hackathon.app.service;

import com.hackathon.app.dto.response.DailySummaryResponse;
import com.hackathon.app.entity.Appointment;
import com.hackathon.app.entity.AppointmentStatus;
import com.hackathon.app.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SummaryService {

    private final AppointmentRepository appointmentRepository;

    public DailySummaryResponse getDailySummary(LocalDate date) {
        List<Appointment> appointments = appointmentRepository.findByAppointmentDate(date);

        long total = appointments.size();
        double totalRevenue = 0;
        Map<String, Long> byMode = new HashMap<>();
        Map<String, Double> revenueByMode = new HashMap<>();
        Map<String, Long> bySpecialty = new HashMap<>();

        for (Appointment a : appointments) {
            if (a.getStatus() == AppointmentStatus.CANCELLED) continue;

            String mode = a.getMode().name();
            byMode.merge(mode, 1L, Long::sum);

            Double fee = a.getDoctor().getConsultationFee();
            if (fee != null) {
                totalRevenue += fee;
                revenueByMode.merge(mode, fee, Double::sum);
            }

            String specialty = a.getDoctor().getSpecialty().getName();
            bySpecialty.merge(specialty, 1L, Long::sum);
        }

        return DailySummaryResponse.builder()
                .date(date)
                .totalAppointments(total)
                .totalRevenue(totalRevenue)
                .appointmentsByMode(byMode)
                .revenueByMode(revenueByMode)
                .appointmentsBySpecialty(bySpecialty)
                .build();
    }
}
