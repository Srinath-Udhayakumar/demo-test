package com.hackathon.app.dto.request;

import com.hackathon.app.entity.AppointmentStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateStatusRequest {

    @NotNull(message = "Status is required")
    private AppointmentStatus status;
}
