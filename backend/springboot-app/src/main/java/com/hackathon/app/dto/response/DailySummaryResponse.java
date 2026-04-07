package com.hackathon.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailySummaryResponse {
    private LocalDate date;
    private long totalAppointments;
    private double totalRevenue;
    private Map<String, Long> appointmentsByMode;
    private Map<String, Double> revenueByMode;
    private Map<String, Long> appointmentsBySpecialty;
}
