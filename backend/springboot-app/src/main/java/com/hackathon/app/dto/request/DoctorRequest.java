package com.hackathon.app.dto.request;

import com.hackathon.app.entity.AppointmentMode;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DoctorRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotNull(message = "Specialty ID is required")
    private Long specialtyId;

    @NotNull(message = "Mode is required")
    private AppointmentMode mode;

    private Double consultationFee;

    private String availableSlots;
}
