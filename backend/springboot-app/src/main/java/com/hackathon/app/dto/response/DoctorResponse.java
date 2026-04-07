package com.hackathon.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorResponse {
    private Long id;
    private String name;
    private String email;
    private String specialtyName;
    private String mode;
    private boolean available;
    private Double consultationFee;
    private String availableSlots;
}
