package com.hackathon.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentResponse {
    private Long id;
    private String patientName;
    private String doctorName;
    private String specialtyName;
    private LocalDate appointmentDate;
    private String appointmentTime;
    private String mode;
    private String status;
    private String notes;
    private String videoLink;
    private Double consultationFee;
    private LocalDateTime createdAt;
}
