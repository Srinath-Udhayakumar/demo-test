package com.hackathon.app.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AppointmentRequest {

    @NotNull(message = "Doctor ID is required")
    private Long doctorId;

    @NotNull(message = "Appointment date is required")
    private LocalDate appointmentDate;

    @NotBlank(message = "Appointment time is required")
    private String appointmentTime;

    private String notes;
}
